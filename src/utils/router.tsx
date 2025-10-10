import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout"; // 🟢 Import normally so Navbar/Footer load instantly
import ScrollToTop from "../components/ScrollToTop";

// Lazy-load all non-critical or heavy routes
const ProtectedRoutes = lazy(() => import("./protectedRoutes"));
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Signup = lazy(() => import("../pages/Signup"));
const Signin = lazy(() => import("../pages/Signin"));
const Cart = lazy(() => import("../pages/Cart"));
const Collection = lazy(() => import("../pages/Collection"));
const ArtItem = lazy(() => import("../pages/ArtItem"));
const ArtworkManagement = lazy(() => import("../pages/ArtworkManagement"));
const Users = lazy(() => import("../components/pages/Users"));
const Reviews = lazy(() => import("../pages/Reviews"));
const Artists = lazy(() => import("../pages/Artists"));
const Favorites = lazy(() => import("../pages/Favorites"));
const Unauthorised = lazy(() => import("../pages/Unauthorised"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Addresses = lazy(() => import("../pages/Addresses"));
const Orders = lazy(() => import("../components/pages/Orders"));
const PaymentSuccessPage = lazy(() => import("../components/pages/SuccessPage"));
const PaymentFailed = lazy(() => import("../components/Callback"));

// ✨ Fade-in wrapper for better transitions
const FadeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`transition-opacity transform transition-transform duration-500 ease-in-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
};

// 🔹 Type-safe Suspense wrapper
const withSuspense = (Component: React.ComponentType<any>) => (
  <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
    <ScrollToTop />
    <FadeWrapper>
      <Component />
    </FadeWrapper>
  </Suspense>
);

// 🔸 Router setup
export const router = createBrowserRouter([
  // Public routes
  { path: "signup", element: withSuspense(Signup) },
  { path: "signin", element: withSuspense(Signin) },
  { path: "payment-success", element: withSuspense(PaymentSuccessPage) },
  { path: "payment-failed", element: withSuspense(PaymentFailed) },
  { path: "unauthorised", element: withSuspense(Unauthorised) },
  { path: "*", errorElement: withSuspense(NotFound) },

  // Admin protected routes
  {
    path: "dashboard",
    element: withSuspense(ProtectedRoutes),
    children: [
      { index: true, element: withSuspense(ArtworkManagement) },
      { path: "users", element: withSuspense(Users) },
      { path: "orders", element: withSuspense(Orders) },
    ],
  },

  // Main layout routes
  {
    path: "/",
    element: <Layout />, // ✅ Normal import — renders instantly
    children: [
      { index: true, element: withSuspense(Home) },
      { path: "about", element: withSuspense(About) },
      {
        path: "collection",
        children: [
          { index: true, element: withSuspense(Collection) },
          { path: ":artId", element: withSuspense(ArtItem) },
        ],
      },
      { path: "reviews", element: withSuspense(Reviews) },
      { path: "artists", element: withSuspense(Artists) },
      { path: "contact", element: withSuspense(Contact) },
      { path: "cart", element: withSuspense(Cart) },
      { path: "address", element: withSuspense(Addresses) },
      { path: "artwork", element: withSuspense(ArtworkManagement) },
      { path: "favorites", element: withSuspense(Favorites) },
    ],
  },
]);
