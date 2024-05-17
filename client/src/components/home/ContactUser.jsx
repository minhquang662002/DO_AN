import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { AiOutlineHome } from "react-icons/ai";
import {
  BsGenderMale,
  BsGenderFemale,
  BsGenderAmbiguous,
} from "react-icons/bs";
import { useSelector } from "react-redux";

const ContactUser = ({ item, type = "single" }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [delayHandler, setDelayHandler] = useState(null);
  const { online } = useSelector((state) => state);
  const handleMouseOver = () => {
    setDelayHandler(
      setTimeout(() => {
        setShowDetails(true);
      }, 300)
    );
  };
  const { showChatBox, setShowChatBox } = useContext(GlobalContext);
  const handleMouseLeave = () => {
    setShowDetails(false);
    clearTimeout(delayHandler);
  };
  const handleShowChatBox = () => {
    if (showChatBox.some((box) => box._id === item?._id)) return;
    if (showChatBox.length >= 3) {
      setShowChatBox((state) => [{ ...item, type }, ...state.slice(1, 3)]);
    } else {
      setShowChatBox((state) => [{ ...item, type }, ...state]);
    }
  };

  return (
    <div
      className="relative flex items-center gap-2 hover:bg-cyan-400 dark:hover:bg-purple-500 hover:text-white transition-colors rounded-lg p-2 cursor-pointer"
      onMouseEnter={type === "single" ? handleMouseOver : undefined}
      onMouseLeave={type === "single" ? handleMouseLeave : undefined}
      onClick={() => handleShowChatBox()}
    >
      <div
        className="w-8 h-8 border border-black dark:border-purple-500 rounded-full bg-cover bg-center relative shrink-0"
        style={{ backgroundImage: `url(${item?.avatar})` }}
      >
        {online?.online?.includes(item?.userID) && (
          <div className="absolute w-2 h-2 bg-green-400 bottom-0 right-0 rounded-full border border-white" />
        )}
      </div>
      {type === "single" ? (
        <p>{item?.firstName + " " + item?.lastName}</p>
      ) : (
        <p>{item?.name}</p>
      )}
      <div
        className={`absolute flex w-[350px] p-4 gap-4 -translate-x-[105%] bg-white dark:bg-slate-900 text-black ${
          showDetails ? "visible opacity-100" : "invisible opacity-0"
        } transition rounded-lg shadow-lg border border-gray-200 dark:border-purple-500 dark:text-white z-20`}
      >
        <div
          className="w-24 h-24 border border-white rounded-full bg-cover bg-center relative shrink-0"
          style={{ backgroundImage: `url(${item.avatar})` }}
        >
          {online?.online?.includes(item?._id) && (
            <div className="absolute w-6 h-6 bg-green-400 bottom-0 right-0 rounded-full border border-white" />
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-2xl font-bold">
            {item.firstName + " " + item.lastName}
          </p>
          <div className="flex items-center gap-2">
            {item?.gender == 1 ? (
              <BsGenderMale />
            ) : item?.gender == 0 ? (
              <BsGenderFemale />
            ) : (
              <BsGenderAmbiguous />
            )}
            <p>
              {item?.gender == 1
                ? "Male"
                : item?.gender == 0
                ? "Female"
                : "Other"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AiOutlineHome />
            <p>{item?.address || "Empty"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUser;
