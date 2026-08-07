import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Background } from "@/components/Background";
import { Home } from "@/pages/Home";
import { Projects } from "@/pages/Projects";
import { About } from "@/pages/About";

function Root() {
  return (
    <HelmetProvider>
      <div className="relative min-h-screen bg-black text-white">
        <Background />
        <div className="grain" />

        <Navbar />
        <main className="relative z-10">
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
      </div>
    </HelmetProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "about", element: <About /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
