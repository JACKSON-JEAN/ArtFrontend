import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout"; // 🟢 Import normally so Navbar/Footer load instantly
import ScrollToTop from "../components/ScrollToTop";
import NotFound from "../pages/NotFound";
import RouterError from "../components/RouterError";

const lazyRetry = (importFn: () => Promise<any>) =>
  lazy(() =>
    importFn().catch(() => {
      if(!sessionStorage.getItem("chunk-retry")){
        sessionStorage.setItem("chunk-retry", "true");
        window.location.reload();
      }
      return Promise.reject();
    }),
  );

// Lazy-load all non-critical or heavy routes
const ProtectedRoutes = lazy(() => import("./protectedRoutes"));
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Signup = lazy(() => import("../pages/Signup"));
const Signin = lazy(() => import("../pages/Signin"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const Cart = lazy(() => import("../pages/Cart"));
const Collection = lazy(() => import("../pages/Collection"));
const ArtItem = lazy(() => import("../pages/ArtItem"));
const ArtworkManagement = lazyRetry(() => import("../pages/ArtworkManagement"));
const Users = lazyRetry(() => import("../components/pages/Users"));
const Reviews = lazy(() => import("../pages/Reviews"));
const Artists = lazy(() => import("../pages/Artists"));
const Favorites = lazy(() => import("../pages/Favorites"));
const Unauthorised = lazy(() => import("../pages/Unauthorised"));
const Addresses = lazy(() => import("../pages/Addresses"));
const Orders = lazy(() => import("../components/pages/Orders"));
const PaymentSuccessPage = lazy(
  () => import("../components/pages/SuccessPage"),
);
const PaymentCancelled = lazy(
  () => import("../components/pages/PaymentCancelled"),
);
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
  <Suspense fallback={<div className="text-center p-3">Loading...</div>}>
    <ScrollToTop />
    <FadeWrapper>
      <Component />
    </FadeWrapper>
  </Suspense>
);

// 🔸 Router setup
export const router = createBrowserRouter([
  // Public routes
  {
    errorElement: <RouterError />,
    children: [
      { path: "signup", element: withSuspense(Signup) },
      { path: "signin", element: withSuspense(Signin) },
      { path: "forgot-password", element: withSuspense(ForgotPassword) },
      { path: "reset-password", element: withSuspense(ResetPassword) },
      { path: "payment-success", element: withSuspense(PaymentSuccessPage) },
      { path: "payment-cancelled", element: withSuspense(PaymentCancelled) },
      { path: "payment-failed", element: withSuspense(PaymentFailed) },
      { path: "unauthorised", element: withSuspense(Unauthorised) },
      { path: "*", element: <NotFound /> },
    ],
  },

  // Admin protected routes
  {
    path: "dashboard",
    element: withSuspense(ProtectedRoutes),
    errorElement: <RouterError />,
    children: [
      { index: true, element: withSuspense(ArtworkManagement) },
      { path: "users", element: withSuspense(Users) },
      { path: "orders", element: withSuspense(Orders) },
    ],
  },

  // Main layout routes
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouterError />,
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
