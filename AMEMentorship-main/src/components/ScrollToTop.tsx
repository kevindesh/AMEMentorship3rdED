import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, key } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [pathname, navType, key]);

  return null;
}
