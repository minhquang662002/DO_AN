import NavLeft from "./NavLeft";
import NavCenter from "./NavCenter";
import NavRight from "./NavRight";
import { useState, memo, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowSizeChange);
    let prevScroll = window.scrollY;
    const showStick = () => {
      if (pathname == "/") {
        if (window.scrollY == 0 || window.scrollY < prevScroll) {
          document.querySelector(".test")?.classList.remove("-translate-y-10");
        } else {
          document.querySelector(".test")?.classList.add("-translate-y-10");
        }
      }

      prevScroll = window.scrollY;
    };
    if (width <= 740) {
      window.addEventListener("scroll", showStick);
    } else {
      document.querySelector(".test")?.classList.remove("-translate-y-10");
      window.removeEventListener("scroll", showStick);
    }
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
      window.removeEventListener("scroll", showStick);
    };
  }, [width, pathname]);

  return (
    <>
      <div
        className={`test ${
          pathname != "/" ? "-translate-y-10" : "md:-translate-y-0"
        } fixed top-0 w-full flex-col bg-white dark:bg-slate-700 px-4 lg:h-16 border-b border-gray-300 dark:border-purple-500 dark:text-white z-40 transition`}
      >
        <div className="flex justify-between">
          <NavLeft />

          <NavCenter ver="pc" />

          <NavRight />
        </div>

        <NavCenter ver="mobile" />
      </div>

      <div className="h-14 lg:h-16 shrink-0" />
    </>
  );
};

export default memo(Navbar);
