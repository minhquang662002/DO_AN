import { useEffect } from "react";

const Wrapper = ({ children }) => {
  useEffect(() => {
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, []);

  return (
    <div
      className="fixed flex justify-center items-center inset-0 bg-black z-50 overflow-y-scroll"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
