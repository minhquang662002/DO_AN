import Notification from "./Notification";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import {
  useGetNotificationsQuery,
  useReadAllNotificationsMutation,
  useReadNotificationMutation,
  useDeleteAllNotificationsMutation,
} from "../../redux/services/notification.service";
import NotificationSkeleton from "../skeleton/NotificationSkeleton";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import { useClickOutside } from "../../hooks/hooks";
import { useSelector } from "react-redux";

const NotificationBox = ({ user }) => {
  const [all, setAll] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [readNotification] = useReadNotificationMutation();
  const [readAllNotification] = useReadAllNotificationsMutation();
  const [deleteAllNotifications] = useDeleteAllNotificationsMutation();
  const { isFetching: loading } = useGetNotificationsQuery(
    {
      amount: "",
      type: all ? "" : "unread",
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setShowOptions(false));
  const { notification } = useSelector((state) => state);

  return (
    <>
      <div className="pstb absolute md:top-6 right-0 flex flex-col bg-white dark:bg-slate-900 border border-gray-300 dark:border-purple-500 rounded-lg w-96 h-120 p-4 overflow-y-auto">
        <div className="relative flex items-center justify-between">
          <p className="text-2xl font-bold">Notification</p>
          <div className="overflow-hidden" ref={modalRef}>
            <div
              className="flex items-center justify-center w-6 h-6 hover:bg-gray-300 rounded-full cursor-pointer"
              onClick={() => setShowOptions((state) => !state)}
            >
              <BiDotsHorizontalRounded />
            </div>
            {showOptions && (
              <div className="absolute top-[100%] right-0 bg-white dark:bg-slate-900 rounded border border-gray-300 p-2">
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
                    notification?.notifications?.length > 0 &&
                      deleteAllNotifications();
                  }}
                >
                  <AiOutlineDelete />
                  Delete all notification
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 text-sm">
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
        <Link
          to="/notification"
          className="text-cyan-500 cursor-pointer hover:bg-slate-300 ml-auto p-2 rounded"
        >
          See all
        </Link>
        <div className="mt-2">
          {loading ? (
            [1, 2, 3, 4, 5].map((item) => <NotificationSkeleton key={item} />)
          ) : notification?.notifications.length > 0 ? (
            notification?.notifications?.map((item) => (
              <Link key={item?.notificationID} to={`${item?.url}`}>
                <div
                  onClick={() => {
                    if (!item?.readBy?.includes(user?.userID)) {
                      readNotification(item?.userID);
                    }
                  }}
                >
                  <Notification item={item} user={user} />
                </div>
              </Link>
            ))
          ) : (
            <div className="text-2xl text-center">No notifications</div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationBox;
