// src/engine-install.ts
function install() {
  if (!window.ScrollCraft) {
    (function(global) {
      "use strict";
      var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      var fineMQ = matchMedia("(hover: hover) and (pointer: fine)");
      var smallMQ = matchMedia("(max-width: 860px)");
      var coarse = matchMedia("(hover: none) and (pointer: coarse)").matches;
      var isMobile = function() {
        return coarse || smallMQ.matches;
      };
      var clamp = function(x, a, b) {
        return x < a ? a : x > b ? b : x;
      };
      var clamp01 = function(x) {
        return clamp(x, 0, 1);
      };
      var smooth = function(x) {
        x = clamp01(x);
        return x * x * (3 - 2 * x);
      };
      var lerp = function(a, b, t) {
        return a + (b - a) * t;
      };
      function dwell(x, L) {
        if (!L) return x;
        L = clamp01(L);
        var c = x - 0.5;
        return (1 - L) * x + L * (4 * c * c * c + 0.5);
      }
      function lingerEase(x, L) {
        if (!L) return x;
        L = clamp(L, 0, 0.6);
        var c = x - 0.5;
        return (1 - L) * x + L * (4 * c * c * c + 0.5);
      }
      function lerpRate(el) {
        var v = parseFloat(el && el.getAttribute && el.getAttribute("data-sc-lerp"));
        return isNaN(v) || v <= 0 ? 0 : clamp(v, 0.02, 1);
      }
      function parseColor(str) {
        str = (str || "").trim();
        var m = str.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
        if (m) {
          var h = m[1];
          if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
          return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
        }
        m = str.match(/rgba?\(([^)]+)\)/i);
        if (m) {
          var p = m[1].split(/[,\s/]+/).filter(Boolean).map(parseFloat);
          return [p[0], p[1], p[2]];
        }
        return null;
      }
      function mixColor(a, b, t) {
        return "rgb(" + Math.round(lerp(a[0], b[0], t)) + "," + Math.round(lerp(a[1], b[1], t)) + "," + Math.round(lerp(a[2], b[2], t)) + ")";
      }
      function splitText(el, mode) {
        if (el.__scSplit) return el.__scSplit;
        var text = el.textContent;
        var units = [];
        if (mode === "chars" || mode === "words") {
          var parts = mode === "chars" ? Array.from(text) : text.split(/(\s+)/);
          el.textContent = "";
          parts.forEach(function(t) {
            if (/^\s+$/.test(t)) {
              el.appendChild(document.createTextNode(t));
              return;
            }
            var mask = document.createElement("span");
            mask.className = "sc-split";
            var inner = document.createElement("span");
            inner.className = "sc-split__i";
            inner.textContent = t;
            mask.appendChild(inner);
            el.appendChild(mask);
            units.push(inner);
          });
        } else {
          var words = text.split(/\s+/).filter(Boolean);
          el.textContent = "";
          var probes = words.map(function(w, i) {
            var s = document.createElement("span");
            s.textContent = w;
            el.appendChild(s);
            if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
            return s;
          });
          var lines = [], cur = null, lastTop = null;
          probes.forEach(function(s) {
            var top = s.offsetTop;
            if (lastTop === null || Math.abs(top - lastTop) > 1) {
              cur = [];
              lines.push(cur);
              lastTop = top;
            }
            cur.push(s.textContent);
          });
          el.textContent = "";
          lines.forEach(function(words2, li) {
            var mask = document.createElement("span");
            mask.className = "sc-split sc-split--line";
            var inner = document.createElement("span");
            inner.className = "sc-split__i";
            inner.textContent = words2.join(" ");
            mask.appendChild(inner);
            el.appendChild(mask);
            if (li < lines.length - 1) el.appendChild(document.createTextNode(" "));
            units.push(inner);
          });
        }
        el.classList.add("sc-is-split");
        el.__scSplit = units;
        return units;
      }
      function formatNum(v, template) {
        var decimals = 0;
        var dot = template.indexOf(".");
        if (dot > -1) decimals = template.length - dot - 1;
        var s = v.toFixed(decimals);
        if (/,/.test(template) || Math.abs(v) >= 1e4) {
          var bits = s.split(".");
          bits[0] = bits[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          s = bits.join(".");
        }
        return s;
      }
      function mount(root, opts) {
        root = typeof root === "string" ? document.querySelector(root) : root || document;
        opts = opts || {};
        var scListeners = [];
        var scDead = false;
        var scTickFrame = 0, scPointerFrame = 0;
        function on(type, fn, o) {
          addEventListener(type, fn, o);
          scListeners.push([type, fn, o]);
        }
        var acts = [];
        var worlds = [];
        var drifts = [];
        var playheads = [];
        var scrollEls = [];
        var vh = innerHeight, vw = innerWidth;
        var y = 0, needsLayout = true;
        var progressBar = root.querySelector("[data-sc-progress]");
        var docEl = document.documentElement;
        var LERP = lerpRate(root.nodeType === 1 ? root : null) || lerpRate(docEl) || (opts.lerp > 0 ? clamp(opts.lerp, 0.02, 1) : 0) || 0.18;
        function makeClip(v, host) {
          var rec = {
            el: v,
            host: host || v,
            ready: false,
            loading: false,
            painted: false,
            cur: 0,
            target: 0,
            live: false,
            stuckAt: 0,
            lerp: lerpRate(v) || LERP
          };
          v.muted = true;
          v.playsInline = true;
          v.preload = "none";
          v.setAttribute("muted", "");
          v.setAttribute("playsinline", "");
          playheads.push(rec);
          return rec;
        }
        Array.prototype.forEach.call(root.querySelectorAll("[data-sc-act]"), function(el) {
          var device = el.getAttribute("data-sc-act") || "flow";
          var pinned = device === "scrub" || device === "pin" || device === "pan";
          var act = {
            el,
            device,
            pinned,
            span: parseFloat(el.getAttribute("data-sc-span")) || (pinned ? 1.5 : 0),
            dwell: parseFloat(el.getAttribute("data-sc-dwell")) || 0,
            clipTravel: pinned && el.getAttribute("data-sc-clip-map") === "travel",
            p: 0,
            raw: 0,
            top: 0,
            height: 0,
            live: false,
            cues: [],
            parallax: [],
            reveals: [],
            counts: [],
            video: null,
            seq: null,
            rail: null
          };
          if (pinned) {
            act.stage = el.querySelector("[data-sc-stage]") || el.querySelector(".sc-stage");
            if (act.stage) act.stage.classList.add("sc-stage");
            el.classList.add("sc-act--pinned");
          }
          var v = el.querySelector("video[data-sc-scrub]");
          if (v) act.video = makeClip(v, el);
          var cv = el.querySelector("canvas[data-sc-sequence]");
          if (cv) {
            var spec = cv.getAttribute("data-sc-sequence").split(":");
            act.seq = {
              el: cv,
              ctx: cv.getContext("2d", { alpha: false }),
              tpl: spec[0],
              count: parseInt(spec[1], 10) || 1,
              start: parseInt(spec[2], 10) || 0,
              frames: [],
              loaded: 0,
              drawn: -1
            };
          }
          act.rail = el.querySelector("[data-sc-pan]");
          if (act.rail) act.railExtra = parseFloat(act.rail.getAttribute("data-sc-pan")) || 0;
          Array.prototype.forEach.call(el.querySelectorAll("[data-sc-cue]"), function(c) {
            var nums = (c.getAttribute("data-sc-cue") || "").trim().split(/\s+/).map(parseFloat);
            var cue = {
              el: c,
              from: isNaN(nums[0]) ? 0 : nums[0],
              to: nums.length > 1 && !isNaN(nums[1]) ? nums[1] : null,
              rIn: nums.length > 2 && !isNaN(nums[2]) ? clamp01(nums[2]) : 0.3,
              rOut: nums.length > 3 && !isNaN(nums[3]) ? clamp01(nums[3]) : null,
              rise: parseFloat(c.getAttribute("data-sc-rise")),
              kinetic: c.getAttribute("data-sc-kinetic"),
              units: null,
              state: -1
            };
            if (cue.rOut === null) cue.rOut = nums.length > 2 && !isNaN(nums[2]) ? 0.3 : 0.3;
            if (isNaN(cue.rise)) cue.rise = 1;
            act.cues.push(cue);
          });
          Array.prototype.forEach.call(el.querySelectorAll("[data-sc-parallax]"), function(c) {
            act.parallax.push({ el: c, rate: parseFloat(c.getAttribute("data-sc-parallax")) || 0 });
          });
          Array.prototype.forEach.call(el.querySelectorAll("[data-sc-reveal]"), function(c) {
            var nums = (c.getAttribute("data-sc-reveal-at") || "0 0.5").trim().split(/\s+/).map(parseFloat);
            act.reveals.push({ el: c, dir: c.getAttribute("data-sc-reveal") || "up", from: nums[0] || 0, to: nums[1] || 0.5 });
          });
          Array.prototype.forEach.call(el.querySelectorAll("[data-sc-count]"), function(c) {
            var nums = (c.getAttribute("data-sc-count") || "").trim().split(/\s+/);
            var at = (c.getAttribute("data-sc-count-at") || "0.1 0.55").trim().split(/\s+/).map(parseFloat);
            var num = function(s) {
              return parseFloat(String(s).replace(/,/g, "")) || 0;
            };
            act.counts.push({
              el: c,
              a: num(nums[0]),
              b: num(nums[1]),
              tpl: nums[1] || "0",
              from: at[0],
              to: at[1],
              last: null
            });
          });
          acts.push(act);
          var d = el.getAttribute("data-sc-drift");
          if (d) {
            var rgb = parseColor(d);
            if (rgb) drifts.push({ act, rgb });
          }
        });
        Array.prototype.forEach.call(root.querySelectorAll('[data-sc-mode="worldflight"]'), function(el) {
          var W = {
            el,
            stage: el.querySelector("[data-sc-world]") || el.querySelector(".sc-world"),
            copyLayer: el.querySelector("[data-sc-world-copy]") || el.querySelector(".sc-world__copy"),
            spacer: el.querySelector("[data-sc-spacer]") || el.querySelector(".sc-world__spacer"),
            seam: 0,
            segs: [],
            copies: [],
            total: 0,
            top: 0,
            index: -1,
            checked: false
          };
          var seam = parseFloat(el.getAttribute("data-sc-seam"));
          W.seam = isNaN(seam) || seam <= 0 ? 0.12 : clamp(seam, 0.02, 0.4);
          if (W.stage) W.stage.classList.add("sc-world");
          if (W.copyLayer) W.copyLayer.classList.add("sc-world__copy");
          if (W.spacer) W.spacer.classList.add("sc-world__spacer");
          Array.prototype.forEach.call(el.querySelectorAll("[data-sc-segment]"), function(s) {
            var seg = {
              el: s,
              w: parseFloat(s.getAttribute("data-sc-w")) || 1.3,
              linger: clamp(parseFloat(s.getAttribute("data-sc-linger")) || 0, 0, 0.6),
              label: s.getAttribute("data-sc-waypoint") || "",
              poster: s.querySelector("[data-sc-poster]") || s.querySelector(".sc-world__poster") || s.querySelector("img"),
              c0: 0,
              c1: 0,
              local: 0,
              op: -1,
              z: -1,
              clip: null
            };
            s.classList.add("sc-world__seg");
            if (seg.poster) seg.poster.classList.add("sc-world__poster");
            var v = s.querySelector("video");
            if (v) {
              v.setAttribute("data-sc-scrub", "");
              seg.clip = makeClip(v, s);
            }
            W.segs.push(seg);
          });
          var run = 0;
          W.segs.forEach(function(s) {
            s.c0 = run;
            run += Math.max(s.w, 0.1);
            s.c1 = run;
          });
          W.total = Math.max(run, 1e-3);
          Array.prototype.forEach.call(el.querySelectorAll("[data-sc-copy]"), function(cEl) {
            var spec = (cEl.getAttribute("data-sc-window") || "").trim();
            var q = { el: cEl, from: 0, to: 1, rIn: 0.3, rOut: 0.3, state: -1 };
            var first = W.segs[0], last = W.segs[W.segs.length - 1];
            if (spec === "hero") {
              q.from = 0;
              q.to = first ? 0.62 * first.w / W.total : 0.3;
              q.rIn = 0;
              q.rOut = 0.65;
            } else if (spec === "finale") {
              q.from = last ? (last.c0 + 0.4 * last.w) / W.total : 0.7;
              q.to = 1;
              q.rIn = 0.55;
              q.rOut = 0;
            } else {
              var n = spec.split(/\s+/).map(parseFloat);
              q.from = isNaN(n[0]) ? 0 : clamp01(n[0]);
              q.to = n.length > 1 && !isNaN(n[1]) ? clamp01(n[1]) : clamp01(q.from + 0.18);
              if (n.length > 2 && !isNaN(n[2])) q.rIn = clamp01(n[2]);
              if (n.length > 3 && !isNaN(n[3])) q.rOut = clamp01(n[3]);
            }
            if (q.to <= q.from) q.to = clamp01(q.from + 0.05);
            W.copies.push(q);
          });
          worlds.push(W);
        });
        var io = null, cio = null;
        if ("IntersectionObserver" in window) {
          io = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
              if (!e.isIntersecting) return;
              var el = e.target;
              el.classList.add("sc-in");
              var stagger = parseFloat(el.getAttribute("data-sc-stagger"));
              if (!isNaN(stagger)) {
                Array.prototype.forEach.call(el.children, function(kid, i) {
                  kid.style.transitionDelay = i * stagger + "ms";
                  kid.classList.add("sc-in");
                });
              }
              io.unobserve(el);
            });
          }, { rootMargin: "0px 0px -12% 0px", threshold: 0.01 });
          Array.prototype.forEach.call(root.querySelectorAll("[data-sc-in]"), function(el) {
            io.observe(el);
          });
        } else {
          Array.prototype.forEach.call(root.querySelectorAll("[data-sc-in]"), function(el) {
            el.classList.add("sc-in");
          });
        }
        (function() {
          var ease = function(t) {
            return 1 - Math.pow(1 - t, 3);
          };
          var num = function(s) {
            return parseFloat(String(s).replace(/,/g, "")) || 0;
          };
          var spec = function(c) {
            return (c.getAttribute("data-sc-count") || "").trim().split(/\s+/);
          };
          var els = Array.prototype.filter.call(root.querySelectorAll("[data-sc-count]"), function(c) {
            return !c.closest("[data-sc-act]");
          });
          if (!els.length) return;
          function run(c) {
            var nums = spec(c);
            var a = num(nums[0]), b = num(nums[1]), tpl = nums[1] || "0";
            var ms = parseFloat(c.getAttribute("data-sc-count-ms")) || 1400;
            if (reduce || ms <= 0) {
              c.textContent = formatNum(b, tpl);
              return;
            }
            var t0 = null, last = null;
            function frame(now) {
              if (scDead) return;
              if (t0 === null) t0 = now;
              var t = Math.min((now - t0) / ms, 1);
              var out = formatNum(a + (b - a) * ease(t), tpl);
              if (out !== last) {
                c.textContent = out;
                last = out;
              }
              if (t < 1) requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
          }
          els.forEach(function(c) {
            var n = spec(c);
            c.textContent = formatNum(num(n[0]), n[1] || "0");
          });
          if ("IntersectionObserver" in window) {
            cio = new IntersectionObserver(function(entries) {
              entries.forEach(function(e) {
                if (!e.isIntersecting) return;
                run(e.target);
                cio.unobserve(e.target);
              });
            }, { rootMargin: "0px 0px -10% 0px", threshold: 0.5 });
            els.forEach(function(c) {
              cio.observe(c);
            });
          } else {
            els.forEach(run);
          }
        })();
        function layout() {
          if (scDead) return;
          vh = innerHeight;
          vw = innerWidth;
          acts.forEach(function(a) {
            if (a.pinned) a.el.style.height = a.span * 100 + "vh";
          });
          worlds.forEach(function(W) {
            if (W.spacer) W.spacer.style.height = Math.round((W.total + 1) * vh) + "px";
          });
          acts.forEach(function(a) {
            var r = a.el.getBoundingClientRect();
            a.top = r.top + scrollY;
            a.height = r.height;
          });
          if (acts.length) {
            acts.forEach(function(a) {
              if (a.seq && a.seq.el) {
                var box = a.seq.el.getBoundingClientRect();
                var dpr = Math.min(devicePixelRatio || 1, 2);
                a.seq.el.width = Math.round(box.width * dpr);
                a.seq.el.height = Math.round(box.height * dpr);
                a.seq.drawn = -1;
              }
            });
          }
          acts.forEach(function(a) {
            if (!a.pinned || !a.stage || a.stageChecked) return;
            a.stageChecked = true;
            var pos = getComputedStyle(a.stage).position;
            if (pos !== "sticky" && pos !== "-webkit-sticky") {
              console.warn('[scrollcraft] act "' + (a.el.id || a.device) + '" will not pin: its stage computes position:' + pos + ", not sticky. Something is overriding .sc-stage.", a.stage);
            }
          });
          worlds.forEach(function(W) {
            W.top = W.el.getBoundingClientRect().top + scrollY;
            if (W.checked) return;
            W.checked = true;
            if (!W.stage) {
              console.warn("[scrollcraft] worldflight has no [data-sc-world] stage; nothing will fly.", W.el);
              return;
            }
            if (!W.spacer) {
              console.warn("[scrollcraft] worldflight has no [data-sc-spacer]; the page has no scroll track.", W.el);
            }
            var wp = getComputedStyle(W.stage).position;
            if (wp !== "fixed") {
              console.warn("[scrollcraft] worldflight stage computes position:" + wp + ", not fixed. Something is overriding .sc-world, and the flight will scroll off screen.", W.stage);
            }
          });
          needsLayout = false;
          read();
        }
        function loadVideo(a) {
          loadClip(a.video);
        }
        function loadClip(V) {
          if (reduce || !V || V.loading) return;
          var src = V.el.getAttribute("data-sc-src") || isMobile() && V.el.getAttribute("data-sc-src-mobile") || V.el.currentSrc || V.el.src;
          if (isMobile() && V.el.getAttribute("data-sc-src-mobile")) src = V.el.getAttribute("data-sc-src-mobile");
          if (!src) return;
          V.loading = true;
          fetch(src).then(function(r) {
            if (!r.ok) throw new Error(r.status);
            return r.blob();
          }).then(function(blob) {
            if (scDead) return;
            V.el.addEventListener("loadedmetadata", function() {
              V.ready = true;
              try {
                V.el.currentTime = Math.max(V.target * (V.el.duration || 1), 1e-3);
              } catch (e) {
              }
              read();
              primeClip(V);
            });
            var reveal = function() {
              if (V.painted) return;
              V.painted = true;
              V.host.classList.add("sc-has-clip");
              V.el.classList.add("sc-has-clip");
            };
            V.el.addEventListener("seeked", reveal, { once: true });
            setTimeout(reveal, 2500);
            V.el.preload = "auto";
            V.el.muted = true;
            V.el.playsInline = true;
            V.objectURL = URL.createObjectURL(blob);
            V.el.src = V.objectURL;
          }).catch(function() {
            V.loading = false;
          });
        }
        function loadSeq(a) {
          var S = a.seq;
          if (!S || S.frames.length) return;
          for (var i = 0; i < S.count; i++) {
            (function(i2) {
              var img = new Image();
              img.decoding = "async";
              img.src = S.tpl.replace("{i}", String(S.start + i2)).replace("{ii}", String(S.start + i2).padStart(2, "0")).replace("{iii}", String(S.start + i2).padStart(3, "0")).replace("{iiii}", String(S.start + i2).padStart(4, "0"));
              img.onload = function() {
                S.loaded++;
                if (S.loaded === 1) S.drawn = -1;
              };
              S.frames[i2] = img;
            })(i);
          }
        }
        function drawSeq(a) {
          var S = a.seq;
          if (!S || !S.frames.length) return;
          var idx = clamp(Math.round(a.p * (S.count - 1)), 0, S.count - 1);
          if (idx === S.drawn) return;
          var img = S.frames[idx];
          if (!img || !img.complete || !img.naturalWidth) return;
          var cw = S.el.width, ch = S.el.height;
          var scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
          var w = img.naturalWidth * scale, h = img.naturalHeight * scale;
          S.ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
          S.drawn = idx;
        }
        function readWorld(W) {
          if (!W.segs.length) return;
          var S = W.seam;
          var t = clamp((y - W.top) / Math.max(vh, 1), 0, W.total);
          var pr = t / W.total;
          var i, s;
          var k = 0;
          for (i = 0; i < W.segs.length; i++) if (t >= W.segs[i].c0 - S / 2) k = i;
          for (i = 0; i < W.segs.length; i++) {
            s = W.segs[i];
            var local = clamp01((t - s.c0) / Math.max(s.w, 1e-3));
            s.local = local;
            if (s.clip && t > s.c0 - 1.6 && t < s.c1 + 1.6) loadClip(s.clip);
            var op;
            if (i > k) op = 0;
            else if (i === k) op = i === 0 ? 1 : smooth((t - (s.c0 - S / 2)) / S);
            else op = t < s.c1 + S / 2 ? 1 : 0;
            var z = i === k ? 120 : Math.round(100 + op * 10);
            if (op !== s.op) {
              s.el.style.opacity = op.toFixed(3);
              s.el.style.visibility = op > 2e-3 ? "visible" : "hidden";
              s.op = op;
            }
            if (z !== s.z) {
              s.el.style.zIndex = String(z);
              s.z = z;
            }
            if (s.clip) {
              s.clip.live = op > 2e-3;
              s.clip.target = lingerEase(local, s.linger);
            }
            if (s.poster && !reduce && !(s.clip && s.clip.painted) && op > 2e-3) {
              s.poster.style.transform = "scale(" + (1.03 + local * 0.14).toFixed(4) + ")";
            }
          }
          for (var c = 0; c < W.copies.length; c++) {
            var q = W.copies[c];
            var win = Math.max(q.to - q.from, 1e-3);
            var inEnd = q.from + win * q.rIn;
            var outStart = q.to - win * q.rOut;
            var vis;
            if (pr < q.from) vis = 0;
            else if (pr < inEnd) vis = smooth((pr - q.from) / Math.max(inEnd - q.from, 1e-3));
            else if (pr <= outStart) vis = 1;
            else vis = smooth(1 - (pr - outStart) / Math.max(q.to - outStart, 1e-3));
            vis = clamp01(vis);
            var wp = clamp01((pr - q.from) / win);
            q.el.style.opacity = vis.toFixed(3);
            q.el.style.transform = reduce ? "none" : "translate3d(0," + ((0.5 - wp) * 4).toFixed(2) + "vh,0)";
            var on2 = vis > 0.5;
            if (on2 !== (q.state === 1)) {
              q.state = on2 ? 1 : 0;
              q.el.style.pointerEvents = on2 ? "auto" : "none";
            }
          }
          var cur = W.segs[k];
          W.el.style.setProperty("--sc-seg", String(k));
          W.el.style.setProperty("--sc-segp", cur.local.toFixed(4));
          docEl.style.setProperty("--sc-seg", String(k));
          docEl.style.setProperty("--sc-segp", cur.local.toFixed(4));
          if (k !== W.index) {
            W.index = k;
            try {
              W.el.dispatchEvent(new CustomEvent("sc:waypoint", {
                bubbles: true,
                detail: { index: k, count: W.segs.length, label: cur.label, el: cur.el, progress: pr }
              }));
            } catch (e) {
            }
          }
        }
        function read() {
          if (scDead) return;
          y = scrollY || pageYOffset;
          var driftA = null, driftB = null, driftT = 0;
          var maxY = Math.max((document.documentElement.scrollHeight || 0) - vh, 1);
          for (var i = 0; i < acts.length; i++) {
            var a = acts[i];
            var raw;
            if (a.pinned) {
              var travel = Math.max(a.height - vh, 1);
              raw = clamp01((y - a.top) / travel);
            } else {
              raw = clamp01((y + vh - a.top) / (a.height + vh));
            }
            a.raw = raw;
            a.p = a.dwell ? dwell(raw, a.dwell) : raw;
            a.vp = a.p;
            if (a.pinned && !a.clipTravel) {
              var startY = a.top - Math.min(vh, a.top);
              var endY = Math.min(a.top + a.height, maxY);
              var vraw = clamp01((y - startY) / Math.max(endY - startY, 1));
              a.vp = a.dwell ? dwell(vraw, a.dwell) : vraw;
            }
            a.live = y > a.top - vh * 1.25 && y < a.top + a.height + vh * 1.25;
            a.el.style.setProperty("--sc-p", a.p.toFixed(4));
            var warm = y > a.top - vh * 3 && y < a.top + a.height + vh * 1.5;
            if (warm) {
              if (a.video) loadVideo(a);
              if (a.seq) loadSeq(a);
            }
            if (a.live && a.seq) drawSeq(a);
            if (a.video) {
              a.video.live = a.live;
              if (a.video.ready) a.video.target = a.vp;
            }
            if (a.rail) {
              var over = a.rail.scrollWidth - vw;
              if (over > 0) {
                var extra = over * (a.railExtra || 0);
                a.rail.style.transform = "translate3d(" + (-(over + extra) * a.p).toFixed(2) + "px,0,0)";
              }
            }
            if (!a.live) {
              if (a.parked !== true) {
                for (var z = 0; z < a.cues.length; z++) {
                  var pq = a.cues[z];
                  pq.el.style.opacity = "0";
                  pq.el.style.pointerEvents = "none";
                  pq.state = 0;
                  if (pq.units) for (var zu = 0; zu < pq.units.length; zu++) pq.units[zu].style.opacity = "0";
                }
                a.parked = true;
              }
              continue;
            }
            a.parked = false;
            for (var c = 0; c < a.cues.length; c++) {
              var q = a.cues[c];
              var vis;
              if (q.to === null) {
                vis = smooth((a.p - q.from) / 0.18);
              } else {
                var win = Math.max(q.to - q.from, 1e-3);
                var inEnd = q.from + win * q.rIn;
                var outStart = q.to - win * q.rOut;
                if (a.p < inEnd) vis = smooth((a.p - q.from) / Math.max(inEnd - q.from, 1e-3));
                else if (a.p <= outStart) vis = 1;
                else vis = smooth(1 - (a.p - outStart) / Math.max(q.to - outStart, 1e-3));
              }
              vis = clamp01(vis);
              if (q.kinetic) {
                if (!q.units) q.units = splitText(q.el, q.kinetic);
                var n = q.units.length;
                for (var u = 0; u < n; u++) {
                  var uStart = u / Math.max(n, 1) * 0.62;
                  var uv = clamp01((vis - uStart) / (1 - 0.62 + 1e-3));
                  uv = smooth(uv);
                  q.units[u].style.opacity = uv.toFixed(3);
                  q.units[u].style.transform = reduce ? "none" : "translate3d(0," + ((1 - uv) * 100).toFixed(2) + "%,0)";
                }
                q.el.style.opacity = "1";
              } else {
                q.el.style.opacity = vis.toFixed(3);
                q.el.style.transform = reduce ? "none" : "translate3d(0," + ((1 - vis) * 2.4 * q.rise).toFixed(2) + "vh,0)";
              }
              var on2 = vis > 0.5;
              if (on2 !== (q.state === 1)) {
                q.state = on2 ? 1 : 0;
                q.el.style.pointerEvents = on2 ? "auto" : "none";
              }
            }
            if (!reduce) {
              for (var pz = 0; pz < a.parallax.length; pz++) {
                var pp = a.parallax[pz];
                pp.el.style.transform = "translate3d(0," + (pp.rate * (a.p - 0.5) * 100).toFixed(2) + "px,0)";
              }
            }
            for (var rv = 0; rv < a.reveals.length; rv++) {
              var R = a.reveals[rv];
              var t = smooth((a.p - R.from) / Math.max(R.to - R.from, 1e-3));
              var pct = ((1 - t) * 100).toFixed(2);
              R.el.style.clipPath = R.dir === "down" ? "inset(" + pct + "% 0 0 0)" : R.dir === "left" ? "inset(0 " + pct + "% 0 0)" : R.dir === "right" ? "inset(0 0 0 " + pct + "%)" : R.dir === "iris" ? "circle(" + (t * 78).toFixed(2) + "% at 50% 50%)" : "inset(0 0 " + pct + "% 0)";
            }
            for (var ct = 0; ct < a.counts.length; ct++) {
              var K = a.counts[ct];
              var kt = smooth((a.p - K.from) / Math.max(K.to - K.from, 1e-3));
              var val = lerp(K.a, K.b, kt);
              var out = formatNum(val, K.tpl);
              if (out !== K.last) {
                K.el.textContent = out;
                K.last = out;
              }
            }
          }
          for (var w = 0; w < worlds.length; w++) readWorld(worlds[w]);
          for (var d = 0; d < drifts.length; d++) {
            var D = drifts[d];
            if (D.act.raw > 0 && D.act.raw < 1) {
              driftA = D;
              driftT = smooth(D.act.raw / 0.35);
              driftB = drifts[d - 1] || D;
              break;
            }
            if (D.act.raw >= 1) {
              driftA = D;
              driftB = D;
              driftT = 1;
            }
          }
          if (driftA) {
            docEl.style.setProperty("--sc-canvas", mixColor(driftB.rgb, driftA.rgb, driftT));
          }
          if (progressBar) {
            var max = Math.max(document.body.scrollHeight - vh, 1);
            progressBar.style.transform = "scaleX(" + clamp01(y / max).toFixed(4) + ")";
          }
        }
        function tick() {
          if (scDead) return;
          var eps = isMobile() ? 0.02 : 8e-3;
          for (var i = 0; i < playheads.length; i++) {
            var V = playheads[i];
            if (!V.ready) continue;
            if (V.el.seeking) {
              var nw = performance.now();
              if (!V.stuckAt) V.stuckAt = nw;
              else if (nw - V.stuckAt > 700) {
                V.stuckAt = nw;
                try {
                  V.el.currentTime = V.el.currentTime + 1e-3;
                } catch (e) {
                }
              }
              continue;
            }
            V.stuckAt = 0;
            if (!V.live && Math.abs(V.cur - V.target) < 2e-3) continue;
            V.cur += (V.target - V.cur) * (reduce ? 1 : V.lerp);
            var dur = V.el.duration || 1;
            var t = clamp(V.cur, 0, 0.999) * dur;
            if (Math.abs(V.el.currentTime - t) > eps) {
              try {
                V.el.currentTime = t;
              } catch (e) {
              }
            }
          }
          scTickFrame = requestAnimationFrame(tick);
        }
        var primedCount = 0;
        function primeClip(V) {
          if (V.primed || V.priming || !V.el.src) return;
          V.priming = true;
          var done = function() {
            V.priming = false;
            if (!V.primed) {
              V.primed = true;
              primedCount++;
            }
            try {
              V.el.pause();
            } catch (e) {
            }
            try {
              var dur = V.el.duration || 1;
              V.cur = clamp(V.cur, 0, 0.999);
              V.el.currentTime = clamp(V.cur * dur + 0.05, 0, dur * 0.999);
            } catch (e) {
            }
          };
          var fail = function() {
            V.priming = false;
          };
          setTimeout(function() {
            if (V.priming) fail();
          }, 2e3);
          var pr;
          try {
            pr = V.el.play();
          } catch (e) {
            fail();
            return;
          }
          if (pr && pr.then) pr.then(done, fail);
          else done();
        }
        function prime() {
          for (var i = 0; i < playheads.length; i++) primeClip(playheads[i]);
          if (playheads.length && primedCount >= playheads.length) {
            removeEventListener("touchstart", prime);
            removeEventListener("touchend", prime);
            removeEventListener("pointerdown", prime);
            removeEventListener("click", prime);
            removeEventListener("scroll", prime);
          }
        }
        on("touchstart", prime, { passive: true });
        on("touchend", prime, { passive: true });
        on("pointerdown", prime, { passive: true });
        on("click", prime, { passive: true });
        on("scroll", prime, { passive: true });
        var tilts = [], magnets = [], spots = [];
        function initPointer() {
          if (reduce || !fineMQ.matches) return;
          Array.prototype.forEach.call(root.querySelectorAll("[data-sc-tilt]"), function(el) {
            tilts.push({ el, max: parseFloat(el.getAttribute("data-sc-tilt")) || 6, x: 0, ty: 0, tx: 0, y: 0 });
          });
          Array.prototype.forEach.call(root.querySelectorAll("[data-sc-magnet]"), function(el) {
            magnets.push({ el, k: parseFloat(el.getAttribute("data-sc-magnet")) || 0.3, x: 0, y: 0, tx: 0, ty: 0 });
          });
          Array.prototype.forEach.call(root.querySelectorAll("[data-sc-spotlight]"), function(el) {
            spots.push(el);
          });
          if (!tilts.length && !magnets.length && !spots.length) return;
          on("pointermove", function(e) {
            if (e.pointerType !== "mouse") return;
            for (var i = 0; i < tilts.length; i++) {
              var T = tilts[i], r = T.el.getBoundingClientRect();
              if (r.bottom < -200 || r.top > vh + 200) {
                T.tx = 0;
                T.ty = 0;
                continue;
              }
              var nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
              var ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
              var inside = Math.abs(nx) < 1.6 && Math.abs(ny) < 1.6;
              T.tx = inside ? clamp(ny, -1, 1) * -T.max : 0;
              T.ty = inside ? clamp(nx, -1, 1) * T.max : 0;
            }
            for (var m = 0; m < magnets.length; m++) {
              var M = magnets[m], mr = M.el.getBoundingClientRect();
              var dx = e.clientX - (mr.left + mr.width / 2);
              var dy = e.clientY - (mr.top + mr.height / 2);
              var near = Math.abs(dx) < mr.width && Math.abs(dy) < mr.height * 2.5;
              M.tx = near ? dx * M.k : 0;
              M.ty = near ? dy * M.k : 0;
            }
            for (var s = 0; s < spots.length; s++) {
              var sr = spots[s].getBoundingClientRect();
              spots[s].style.setProperty("--sc-mx", clamp01((e.clientX - sr.left) / sr.width).toFixed(3));
              spots[s].style.setProperty("--sc-my", clamp01((e.clientY - sr.top) / sr.height).toFixed(3));
            }
          }, { passive: true });
          (function pointerTick() {
            if (scDead) return;
            for (var i = 0; i < tilts.length; i++) {
              var T = tilts[i];
              T.x += (T.tx - T.x) * 0.09;
              T.y += (T.ty - T.y) * 0.09;
              if (Math.abs(T.x) > 1e-3 || Math.abs(T.y) > 1e-3) {
                T.el.style.transform = "perspective(1100px) rotateX(" + T.x.toFixed(3) + "deg) rotateY(" + T.y.toFixed(3) + "deg)";
              }
            }
            for (var m = 0; m < magnets.length; m++) {
              var M = magnets[m];
              M.x += (M.tx - M.x) * 0.12;
              M.y += (M.ty - M.y) * 0.12;
              M.el.style.transform = "translate3d(" + M.x.toFixed(2) + "px," + M.y.toFixed(2) + "px,0)";
            }
            scPointerFrame = requestAnimationFrame(pointerTick);
          })();
        }
        var ticking = false;
        on("scroll", function() {
          if (scDead) return;
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(function() {
              if (!scDead) read();
              ticking = false;
            });
          }
        }, { passive: true });
        on("focusin", function(e) {
          var el = e.target;
          if (!el || !el.closest) return;
          var act = el.closest("[data-sc-act]");
          if (!act || !root.contains(act)) return;
          var cue = el.closest("[data-sc-cue]");
          if (!cue) return;
          if (parseFloat(getComputedStyle(cue).opacity || "1") > 0.85) return;
          el.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" });
        });
        var lastW = innerWidth;
        on("resize", function() {
          if (scDead) return;
          if (innerWidth === lastW && isMobile()) {
            vh = innerHeight;
            return;
          }
          lastW = innerWidth;
          layout();
        }, { passive: true });
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(function() {
            if (scDead) return;
            acts.forEach(function(a) {
              a.cues.forEach(function(q) {
                if (q.kinetic && q.units) {
                  q.el.__scSplit = null;
                  q.units = null;
                }
              });
            });
            layout();
          });
        }
        layout();
        initPointer();
        scTickFrame = requestAnimationFrame(tick);
        document.documentElement.classList.add("sc-ready");
        var api = { layout, read, acts, worlds, clips: playheads, lerp: LERP };
        api.destroy = function() {
          if (scDead) return;
          scDead = true;
          for (var i = 0; i < scListeners.length; i++) {
            removeEventListener(scListeners[i][0], scListeners[i][1], scListeners[i][2]);
          }
          scListeners.length = 0;
          if (scTickFrame) {
            cancelAnimationFrame(scTickFrame);
            scTickFrame = 0;
          }
          if (scPointerFrame) {
            cancelAnimationFrame(scPointerFrame);
            scPointerFrame = 0;
          }
          if (io) {
            io.disconnect();
            io = null;
          }
          if (cio) {
            cio.disconnect();
            cio = null;
          }
          for (var v = 0; v < playheads.length; v++) {
            var V = playheads[v];
            try {
              V.el.pause();
            } catch (e) {
            }
            if (V.objectURL) {
              try {
                V.el.removeAttribute("src");
                V.el.load();
              } catch (e) {
              }
              URL.revokeObjectURL(V.objectURL);
              V.objectURL = null;
            }
          }
          var at = global.ScrollCraft.instances.indexOf(api);
          if (at !== -1) global.ScrollCraft.instances.splice(at, 1);
          if (!global.ScrollCraft.instances.length) {
            document.documentElement.classList.remove("sc-ready");
          }
        };
        global.ScrollCraft.instances.push(api);
        return api;
      }
      global.ScrollCraft = { mount, reduce, instances: [] };
    })(window);
  }
  return window.ScrollCraft;
}
export {
  install
};
//# sourceMappingURL=engine-install-PRV3QYI4.js.map