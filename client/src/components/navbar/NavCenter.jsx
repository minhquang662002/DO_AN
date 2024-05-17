import { AiOutlineHome } from "react-icons/ai";
import { FiBell, FiUsers, FiMenu } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavCenter = ({ ver }) => {
  const { pathname } = useLocation();
  const {
    friendRequest: { requests },
  } = useSelector((state) => state);

  return (
    <div
      className={`items-stretch ${
        ver == "pc"
          ? "basis-1/4 hidden md:flex"
          : "w-full flex md:hidden h-10 -mx-2"
      }
    [&>a]:flex [&>a]:flex-col [&>a]:justify-center [&>a]:grow [&>a]:items-center [&>a]:relative`}
    >
      <Link
        to="/"
        className={`${
          pathname !== "/"
            ? "hover:bg-cyan-300 dark:hover:bg-purple-500 transition"
            : ""
        }`}
      >
        <AiOutlineHome
          className={`w-6 h-6 grow ${
            pathname === "/" ? "text-sky-400 dark:text-purple-500" : ""
          }`}
        />
        <div
          className={`absolute left-0 bottom-0 bg-sky-400 dark:bg-purple-500 h-1 transition ${
            pathname === "/" ? "w-full" : "w-0"
          }`}
        />
      </Link>

      <Link
        to="/friends"
        className={`${
          pathname !== "/friends"
            ? "hover:bg-cyan-300 dark:hover:bg-purple-500 transition-all"
            : ""
        }`}
      >
        <div className="!relative">
          <FiUsers
            className={`w-6 h-6 grow ${
              pathname === "/friends" ? "text-sky-400 dark:text-purple-500" : ""
            }`}
          />
          {requests?.length > 0 && (
            <div className="absolute top-0 -right-2 rounded-full w-4 h-4 flex justify-center items-center bg-red-500 text-xs text-white">
              {requests.length}
            </div>
          )}
        </div>
        <div
          className={`absolute left-0 bottom-0 bg-sky-400 dark:bg-purple-500 h-1 transition-all ${
            pathname === "/friends" ? "w-full" : "w-0"
          }`}
        />
      </Link>

      <Link
        to="/groups"
        className={`relative ${
          pathname !== "/groups"
            ? "hover:bg-cyan-300 dark:hover:bg-purple-500 transition-all"
            : ""
        }`}
      >
        <HiOutlineUserGroup
          className={`w-6 h-6 grow ${
            pathname === "/groups" ? "text-sky-400 dark:text-purple-500" : ""
          }`}
        />
        <div
          className={`absolute left-0 bottom-0 bg-sky-400 dark:bg-purple-500 h-1 transition ${
            pathname === "/groups" ? "w-full" : ""
          }`}
        />
      </Link>
      <Link
        to="/watch"
        className={`relative ${
          pathname !== "/watch"
            ? "hover:bg-cyan-300 dark:hover:bg-purple-500 transition"
            : ""
        }`}
      >
        <MdOutlineOndemandVideo
          className={`w-6 h-6 grow ${
            pathname === "/watch" ? "text-sky-400 dark:text-purple-500" : ""
          }`}
        />
        <div
          className={`absolute left-0 bottom-0 bg-sky-400 dark:bg-purple-500 h-1 transition ${
            pathname === "/watch" ? "w-full" : ""
          }`}
        />
      </Link>
      {ver == "mobile" && (
        <Link
          to="/notification"
          className={`relative ${
            pathname !== "/notification"
              ? "hover:bg-cyan-300 dark:hover:bg-purple-500 transition"
              : ""
          }`}
        >
          <FiBell
            className={`w-6 h-6 grow ${
              pathname === "/notification"
                ? "text-sky-400 dark:text-purple-500"
                : ""
            }`}
          />
          <div
            className={`absolute left-0 bottom-0 bg-sky-400 dark:bg-purple-500 h-1 transition ${
              pathname === "/notification" ? "w-full" : ""
            }`}
          />
        </Link>
      )}
      {ver == "mobile" && (
        <Link
          to="/settings"
          className={`relative ${
            pathname !== "/settings"
              ? "hover:bg-cyan-300 dark:hover:bg-purple-500 transition"
              : ""
          }`}
        >
          <FiMenu
            className={`w-6 h-6 grow ${
              pathname === "/settings"
                ? "text-sky-400 dark:text-purple-500"
                : ""
            }`}
          />
          <div
            className={`absolute left-0 bottom-0 bg-sky-400 dark:bg-purple-500 h-1 transition ${
              pathname === "/settings" ? "w-full" : ""
            }`}
          />
        </Link>
      )}
    </div>
  );
};

export default NavCenter;
