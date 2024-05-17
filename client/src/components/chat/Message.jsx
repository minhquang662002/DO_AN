import { useSelector } from "react-redux";
import { IoIosCall, IoIosVideocam } from "react-icons/io";
import dayjs from "dayjs";

const Message = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col">
      <div
        className={`flex ${
          item?.senderInfo?.userID === user?.userID
            ? "flex-row-reverse"
            : "gap-2"
        }`}
      >
        {item?.senderInfo?.userID !== user?.userID && (
          <img
            className="w-8 h-8 rounded-full border border-gray-300"
            src={item?.senderInfo?.avatar}
            alt="av"
          />
        )}
        <div className="flex flex-col grow overflow-x-hidden">
          {(item?.text?.length > 0 || item?.call) && (
            <div
              className={`max-w-[70%] break-words ${
                item?.senderInfo?.userID === user?.userID
                  ? "bg-cyan-400 dark:bg-purple-500 px-2 py-1 rounded-lg text-white ml-auto"
                  : "bg-gray-300 dark:bg-slate-700 px-2 py-1 rounded-lg text-black dark:text-white mr-auto"
              }`}
            >
              {item?.text}
              {item?.call && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center rounded-full bg-green-500 justify-center">
                    {item?.call?.type === "video" ? (
                      <IoIosVideocam className="text-xl" />
                    ) : (
                      <IoIosCall className="text-xl" />
                    )}
                  </div>
                  <div>
                    <p>
                      {item?.call?.type === "video"
                        ? "Video call"
                        : "Voice call"}
                    </p>
                    <p>{item?.call?.timer}s</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <div
            className={`${
              item?.senderInfo?.userID === user?.userID ? "ml-auto" : "mr-auto"
            }`}
          >
            {item?.images?.map((img) => {
              return (
                <img
                  className="w-24 mt-2"
                  key={img?.preview || img}
                  src={img?.preview || img}
                  alt="mesimg"
                />
              );
            })}
          </div>
          <p
            className={`text-xxs text-gray-500 ${
              item?.senderInfo?.userID === user?.userID ? "ml-auto" : "mr-auto"
            }`}
          >
            {dayjs(item?.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
