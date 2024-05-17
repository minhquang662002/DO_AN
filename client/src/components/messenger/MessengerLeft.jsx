import dayjs from "dayjs";
import { memo } from "react";

const MessengerLeft = ({
  conversations,
  user,
  setSelectedConver,
  selectedConver,
  online,
}) => {
  const conveName = (item) => {
    const conve =
      item?.receiverInfos?.length > 0
        ? item?.receiverInfos?.filter((item) => item.userID !== user?.userID)[0]
        : null;
    return conve;
  };
  return (
    <div className="w-[25%] flex flex-col grow p-2 border-r border-cyan-400 dark:border-purple-500">
      <div className="p-2 my-2 w-full">
        <h5 className="text-2xl font-bold mb-2">Chats</h5>
      </div>
      <div className="grow overflow-y-auto" style={{ height: 0 }}>
        {conversations?.map((item) => {
          return (
            <div
              className={`flex gap-4 items-center transition-colors cursor-pointer rounded-lg p-2 ${
                selectedConver?.conversationID === item?.conversationID
                  ? "bg-cyan-400 text-white dark:bg-purple-500"
                  : "hover:bg-cyan-400 hover:text-white dark:hover:bg-purple-500"
              }`}
              key={item?.conversationID}
              onClick={() =>
                setSelectedConver({
                  ...item,
                  target: item?.type === "single" ? conveName(item) : null,
                })
              }
            >
              <div className="relative">
                <div
                  className="w-10 h-10 border border-gray-300 rounded-full bg-cover"
                  style={{
                    backgroundImage: `url(${
                      item?.type === "group" ? "" : conveName(item)?.avatar
                    })`,
                  }}
                />
                {item?.receiverInfos.some((ol) =>
                  online?.online?.includes(ol.userID)
                ) && (
                  <div className="absolute w-3 h-3 bg-green-400 bottom-0 right-0 rounded-full border border-white" />
                )}
              </div>
              <div>
                <p className="hidden md:block text-sm">
                  {item?.name ||
                    `${conveName(item)?.firstName} ${
                      conveName(item)?.lastName
                    }`}
                </p>
                <p className="whitespace-nowrap hidden md:block">
                  <span className="text-xs">
                    {user?.userID === item?.receiverInfos?.[0]?.userID
                      ? "You: "
                      : `${item?.receiverInfos?.[0]?.firstName} ${item?.receiverInfos?.[0]?.lastName}: `}
                  </span>
                  <small>
                    {item?.call
                      ? `${
                          item?.call.type === "video"
                            ? "Video call"
                            : "Voice call"
                        }`
                      : item?.text?.length > 15
                      ? `${item.text.slice(0, 16)}...`
                      : item.text}{" "}
                    .
                  </small>
                  <small>{dayjs(item?.updatedAt).fromNow()}</small>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(MessengerLeft);
