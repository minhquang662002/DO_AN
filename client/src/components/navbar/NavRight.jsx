import { FiBell } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { RiShutDownLine } from "react-icons/ri";
import { useLogoutUserMutation } from "../../redux/services/auth.service";
import NotificationBox from "../notification/NotificationBox";
import { useState, useRef } from "react";
import { useClickOutside } from "../../hooks/hooks";
import { useGetNotificationsQuery } from "../../redux/services/notification.service";
import { useLocation } from "react-router-dom";
import SearchMenu from "./SearchMenu";
import { useSelector } from "react-redux";

const NavRight = () => {
  const [logout] = useLogoutUserMutation();
  const [showNotif, setShowNotif] = useState(false);
  const [isShowingSearchMenu, setIsShowingSearchMenu] = useState(false);
  const boxRef = useRef(null);
  const { pathname } = useLocation();
  const {
    auth: { token, user },
    notification,
  } = useSelector((state) => state);

  useClickOutside(boxRef, () => setShowNotif(false));
  useGetNotificationsQuery({ amount: null, type: null }, { skip: !token });
  let unreadNtfs = user?._id
    ? notification?.notifications?.filter(
        (item) => !item?.readBy.includes(user.userID)
      )
    : [];

  return (
    <div className="flex items-center basis-1/4 gap-x-2 justify-end">
      <div className="hidden lg:block relative" ref={boxRef}>
        <FiBell
          className="text-xl"
          onClick={() => {
            setShowNotif((state) => !state);
          }}
        />
        {showNotif && pathname !== "/notification" && (
          <NotificationBox user={user} />
        )}
        {unreadNtfs.length > 0 && (
          <div className="absolute -top-2 -right-2 flex justify-center items-center w-4 h-4 rounded-full text-white bg-red-500 text-xs">
            {unreadNtfs.length}
          </div>
        )}
      </div>
      <RiShutDownLine
        className="hidden lg:block text-3xl hover:text-red-600 transition-colors cursor-pointer"
        onClick={logout}
      />

      <div
        className={`lg:hidden flex items-center justify-center rounded-full shrink-0 ${
          isShowingSearchMenu
            ? ""
            : "border border-gray-300 dark:border-purple-500 bg-white cursor-pointer dark:bg-slate-800 dark:hover:bg-purple-500 hover:bg-gray-100"
        } h-8 w-8`}
        onClick={() => setIsShowingSearchMenu(true)}
      >
        <BiSearch className="h-4 w-4" />
      </div>
      {isShowingSearchMenu && (
        <SearchMenu setIsShowingSearchMenu={setIsShowingSearchMenu} />
      )}
    </div>
  );
};

export default NavRight;
