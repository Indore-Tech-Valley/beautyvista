// ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Scroll to the anchor if hash exists (like #contact)
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 0); // wait for DOM to load
      }
    } else {
      // Normal route change
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;