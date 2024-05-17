import { BsMessenger } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { memo } from "react";
import FriendButton from "./FriendButton";

const ProfileButton = ({ user, auth }) => {
  const { setShowModal } = useContext(GlobalContext);

  let buttonType;

  if (user?.userID === auth?.user?.userID) {
    buttonType = (
      <>
        <div
          className="bg-white dark:bg-slate-800 dark:hover:bg-slate-900 hover:bg-slate-100 border border-gray-200 dark:border-purple-500 whitespace-nowrap"
          onClick={() => {
            setShowModal((state) => ({ ...state, profile: true }));
          }}
        >
          <MdModeEditOutline />
          <span>Edit profile</span>
        </div>
      </>
    );
  } else {
    buttonType = (
      <>
        <FriendButton />
        <div className="bg-white dark:bg-red-500 hover:bg-slate-100 border border-gray-200">
          <BsMessenger />
          <span>Message</span>
        </div>
      </>
    );
  }

  return (
    <div
      className="flex gap-4 justify-center md:justify-end items-end 
[&>div]:flex [&>div]:gap-2 [&>div]:items-center 
[&>div]:transition-colors [&>div]:rounded-lg [&>div]:px-4 [&>div]:py-2
[&>div]:shadow [&>div]:cursor-pointer"
    >
      {buttonType}
    </div>
  );
};

export default memo(ProfileButton);
