# arfjdms portfolio

Personal site for **arfjdms** — Vite + React + TypeScript, deployed to GitHub Pages on `arfjdms.me`.

## Local

```bash
pnpm install
pnpm dev
pnpm build
```

## Featured work

- [Open Ember Hosting](https://openember.host)
- [EaglerXSkinBridge](https://github.com/arfjdms1/EaglerXSkinBridge)
- [Image-Viewer](https://github.com/arfjdms1/Image-Viewer)

GitHub links use `src/data/site.ts` → `githubUser` (currently `arfjdms1`). Change that one field after a username rename.

## Deploy (GitHub Pages)

On push to `main`, Actions runs `pnpm build` and deploys `dist`.

1. Create the repo under `arfjdms1` (e.g. `arfjdms-portfolio`).
2. Push this project to `main`.
3. Repo **Settings → Pages**: Source = **GitHub Actions**.
4. Set custom domain to `arfjdms.me` (and optionally `www.arfjdms.me`).
5. Enforce HTTPS once DNS verifies.

### DNS checklist for `arfjdms.me`

At your registrar / DNS host:

| Type | Name | Value |
| --- | --- | --- |
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `AAAA` | `@` | `2606:50c0:8000::153` |
| `AAAA` | `@` | `2606:50c0:8001::153` |
| `AAAA` | `@` | `2606:50c0:8002::153` |
| `AAAA` | `@` | `2606:50c0:8003::153` |
| `CNAME` | `www` | `arfjdms1.github.io` |

(If the Pages site lives at `https://arfjdms1.github.io/arfjdms-portfolio/`, apex custom domains still work; keep `public/CNAME` as `arfjdms.me`.)

See [GitHub custom domain docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).
