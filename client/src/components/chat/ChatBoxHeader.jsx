import { IoIosCall, IoIosVideocam, IoMdClose } from "react-icons/io";
import { useState, useContext, useRef } from "react";
import { PeerContext } from "../context/PeerContext";
import ChatBoxSettings from "./ChatBoxSettings";
import { useClickOutside } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";

const ChatBoxHeader = ({
  item,
  setShowModal,
  setShowChatBox,
  online,
  user,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const { callUser, setCallTarget } = useContext(PeerContext);
  const modalRef = useRef();
  const navigate = useNavigate();
  useClickOutside(modalRef, () => setShowSettings(false));
  return (
    <>
      <div className="flex items-center justify-between">
        <div ref={modalRef}>
          <div
            className={`flex items-center p-2 cursor-pointer gap-2  ${
              showSettings
                ? "bg-purple-500"
                : "hover:bg-gray-200 dark:hover:bg-purple-500"
            }`}
            onClick={() => setShowSettings((state) => !state)}
          >
            <div
              className="relative w-9 h-9 rounded-full border border-gray-300 dark:border-white bg-cover bg-center"
              style={{ backgroundImage: `url(${item?.avatar})` }}
              onClick={() => {
                if (item?.type !== "group") {
                  navigate(`/profile?id=${item?.userID}`);
                }
              }}
            >
              {(online?.online?.includes(item?.userID) ||
                online?.online?.some((ol) =>
                  item?.receiver?.some((rv) => rv.userID === ol)
                )) && (
                <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-400" />
              )}
            </div>
            <div className="text-sm">
              <p className="font-bold">
                {item?.type === "group"
                  ? `${item?.name}`
                  : `${item?.firstName} ${item?.lastName}`}
              </p>

              <p className="text-xs">
                {online?.online?.includes(item?.userID) ||
                online?.online?.some((ol) =>
                  item?.receiver?.some((rv) => rv.userID === ol)
                )
                  ? "Active now"
                  : "Offline"}
              </p>
            </div>
          </div>
          {showSettings && item?.type === "group" && (
            <ChatBoxSettings
              setShowModal={setShowModal}
              item={item}
              setShowSettings={setShowSettings}
              user={user}
            />
          )}
        </div>
        <div className="flex items-center text-xl gap-2 text-cyan-400 dark:text-purple-500">
          {item?.type !== "group" && (
            <>
              <IoIosCall
                className="cursor-pointer hover:text-blue-500 transition-colors"
                onClick={() => {
                  callUser(item.userID, "audio");
                  setCallTarget(item);
                }}
              />
              <IoIosVideocam
                className="cursor-pointer hover:text-green-400 transition-colors"
                onClick={() => {
                  callUser(item.userID, "video");
                  setCallTarget(item);
                }}
              />
            </>
          )}
          <IoMdClose
            className="cursor-pointer hover:text-red-500 transition-colors"
            onClick={() =>
              setShowChatBox((state) =>
                state.filter((box) => box._id !== item._id)
              )
            }
          />
        </div>
      </div>
      <div className="border-b border-gray-300 dark:border-purple-500" />
    </>
  );
};

export default ChatBoxHeader;
