// components/StickyAdBanner.tsx
import React, { useEffect, useState } from "react";

export const AD_BANNER_HEIGHT = 40; // px

interface StickyAdBannerProps {
  message?: string;
}

const StickyAdBanner: React.FC<StickyAdBannerProps> = ({
  message = "🎉 Get 20% off all artwork this week! Use code: ZUB20",
}) => {
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY) {
        setShow(false); // hide on scroll down
      } else if (currentY < lastScrollY) {
        setShow(true); // show on scroll up
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`sticky top-0 z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full bg-yellow-100 text-red-950 text-center py-2 text-sm font-medium">
        {message}
      </div>
    </div>
  );
};

export default StickyAdBanner;
