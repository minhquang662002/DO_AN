import { useDarkMode } from "../../hooks/hooks";
import {
  BsMoon,
  BsFillBookmarkFill,
  BsMessenger,
  BsFillCloudHailFill,
} from "react-icons/bs";
import { FaCompass } from "react-icons/fa";
import { useMemo } from "react";
import { useLogoutUserMutation } from "../../redux/services/auth.service";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SettingsPage = () => {
  const [logout] = useLogoutUserMutation();
  const {
    auth: { user },
  } = useSelector((state) => state);
  const [toggleDarkMode] = useDarkMode();
  const shorcutList = useMemo(
    () => [
      {
        icon: <BsMessenger className="text-lg text-blue-600" />,
        text: "Messenger",
      },
      {
        icon: <FaCompass className="text-lg text-orange-600" />,
        text: "Explore",
      },
      {
        icon: <BsFillBookmarkFill className="text-lg text-purple-600" />,
        text: "Saved",
      },
      {
        icon: <BsFillCloudHailFill className="text-lg text-slate-300" />,
        text: "Weather",
      },
      { icon: <BsMoon className="text-lg text-gray-600" />, text: "Display" },
    ],
    []
  );

  return (
    <div className="dark:text-white p-2">
      <p className="text-xl font-bold mb-2">Menu</p>
      <div className="flex gap-2 items-center">
        <div
          className="w-12 h-12 rounded-full border border-black bg-cover bg-center"
          style={{ backgroundImage: `url(${user?.avatar})` }}
        />
        <div>
          <p>
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs">Watch your profile page</p>
        </div>
      </div>
      <div className="border-b my-2" />
      <div>
        <p className="font-bold mb-2">Shorcuts</p>
        <div className="grid grid-cols-2 gap-2">
          {shorcutList.map((item) => (
            <Link
              key={item.text}
              className="p-2 bg-gray-200 dark:bg-slate-700 rounded"
              onClick={item.text == "Display" ? toggleDarkMode : () => {}}
              to={`/${item.text.toLowerCase()}`}
            >
              {item.icon}
              <p className="mt-2">{item.text}</p>
            </Link>
          ))}
        </div>
      </div>
      <div
        className="w-full bg-gray-300 dark:bg-slate-500 rounded text-center mt-10 p-1"
        onClick={logout}
      >
        Logout
      </div>
    </div>
  );
};

export default SettingsPage;
