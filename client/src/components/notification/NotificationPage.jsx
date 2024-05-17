import {
  useGetNotificationsQuery,
  useReadAllNotificationsMutation,
  useReadNotificationMutation,
  useDeleteAllNotificationsMutation,
} from "../../redux/services/notification.service";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import Notification from "./Notification";
import { useState, useRef } from "react";
import { useClickOutside } from "../../hooks/hooks";
import NotificationSkeleton from "../skeleton/NotificationSkeleton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const NotificationPage = () => {
  const [all, setAll] = useState(true);
  const {
    notification: { notifications },
    auth: { user, token },
  } = useSelector((state) => state);
  const [showOptions, setShowOptions] = useState(false);
  const [deleteAllNotifications] = useDeleteAllNotificationsMutation();
  const { isFetching: loading } = useGetNotificationsQuery(
    {
      amount: "all",
      type: all ? "" : "unread",
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !token,
    }
  );

  const [readNotification] = useReadNotificationMutation();
  const [readAllNotification] = useReadAllNotificationsMutation();
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setShowOptions(false));
  return (
    <div className="flex flex-col w-full lg:w-[650px] mx-auto rounded-lg p-4 my-4 dark:bg-slate-900 dark:text-white">
      <div className="relative flex items-center justify-between">
        <p className="text-2xl font-bold">Notification</p>
        <div className="overflow-hidden">
          <div
            ref={modalRef}
            className="flex items-center justify-center w-6 h-6 hover:bg-gray-300 rounded-full cursor-pointer"
            onClick={() => setShowOptions((state) => !state)}
          >
            <BiDotsHorizontalRounded />
          </div>
          {showOptions && (
            <div className="absolute top-[100%] right-0 bg-white dark:bg-slate-900 rounded border border-gray-300 p-2 z-10">
              <div
                className="flex items-center gap-2 hover:bg-cyan-400 hover:text-white cursor-pointer p-1 rounded text-sm transition-colors"
                onClick={() => {
                  readAllNotification();
                  setShowOptions(false);
                }}
              >
                <AiOutlineCheck />
                Mark all as read
              </div>
              <div
                className="flex items-center gap-2 hover:bg-red-400 hover:text-white cursor-pointer p-1 rounded text-sm transition-colors"
                onClick={() => {
                  notifications?.length > 0 && deleteAllNotifications();
                }}
              >
                <AiOutlineDelete />
                Delete all notifications
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 text-sm mb-2">
        <p
          className={`px-4 py-2 rounded-full cursor-pointer ${
            all ? "bg-cyan-400 text-white dark:bg-purple-500" : ""
          }`}
          onClick={() => setAll(true)}
        >
          All
        </p>
        <p
          className={`px-4 py-2 rounded-full cursor-pointer ${
            all ? "" : "bg-cyan-400 text-white dark:bg-purple-500"
          }`}
          onClick={() => setAll(false)}
        >
          Unread
        </p>
      </div>
      {loading ? (
        [1, 2, 3, 4, 5].map((item) => <NotificationSkeleton key={item} />)
      ) : notifications?.length > 0 ? (
        notifications?.map((item) => (
          <Link key={item?._id} to={`${item?.url}`}>
            <div
              onClick={() => {
                if (!item?.readBy?.includes(user?._id)) {
                  readNotification(item?._id);
                }
              }}
            >
              <Notification item={item} user={user} />
            </div>
          </Link>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NotificationPage;
