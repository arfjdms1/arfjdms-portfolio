import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MotionEffects } from "@/components/MotionEffects";
import { Home } from "@/pages/Home";
import { Projects } from "@/pages/Projects";
import { About } from "@/pages/About";
import { NotFound } from "@/pages/NotFound";

function Root() {
  return (
    <div className="site-shell" id="top">
      <MotionEffects />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "about", element: <About /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
