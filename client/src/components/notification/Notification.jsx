import dayjs from "dayjs";

const Notification = ({ item, user }) => {
  return (
    <div className="relative flex gap-2 p-2 -mx-2 hover:bg-cyan-400 hover:text-white dark:hover:bg-purple-500 cursor-pointer rounded-lg transition-colors">
      <div
        className="w-12 h-12 rounded-full border border-white-500 shrink-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${item?.userInfo?.avatar})` }}
      />
      <div className="flex items-center gap-2">
        <div className="flex flex-col text-sm grow overflow-hidden break-words">
          <div>
            <span className="font-bold">
              {item?.userInfo?.firstName} {item?.userInfo?.lastName}
            </span>{" "}
            <span dangerouslySetInnerHTML={{ __html: item?.text }}></span>
          </div>
          <div className="text-xs">{dayjs(item?.createdAt).fromNow()}</div>
        </div>
        {!item?.readBy?.includes(user?.userID) && (
          <div className="w-3 h-3 rounded-full bg-blue-500" />
        )}
      </div>
    </div>
  );
};

export default Notification;
