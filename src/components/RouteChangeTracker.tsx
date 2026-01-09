import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if ((window as any).gtag) {
      (window as any).gtag("config", "AW-1037563441", {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
};

export default RouteChangeTracker;
