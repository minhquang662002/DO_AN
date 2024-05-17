import { MdOutlineAlternateEmail } from "react-icons/md";
import {
  BsGenderMale,
  BsGenderFemale,
  BsGenderAmbiguous,
} from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  useAcceptRequestMutation,
  useCancelRequestMutation,
  useSendRequestMutation,
} from "../../redux/services/friendRequest.service";
import { useCreateNotificationMutation } from "../../redux/services/notification.service";
import { useState } from "react";

const FriendCard = ({ item, type }) => {
  const [acceptRequest] = useAcceptRequestMutation();
  const [cancelRequest] = useCancelRequestMutation();
  const [createNotification] = useCreateNotificationMutation();
  const [sendRequest] = useSendRequestMutation();
  const [sentReq, setSentReq] = useState(null);

  let suggestButton;
  if (sentReq) {
    suggestButton = (
      <button
        className="bg-cyan-500 p-1 text-white rounded grow hover:bg-cyan-600 transition-colors cursor-pointer dark:bg-purple-500 dark:hover:bg-purple-600"
        onClick={() => {
          cancelRequest(sentReq.friendRequestID);
          setSentReq(null);
        }}
      >
        Cancel request
      </button>
    );
  } else {
    suggestButton = (
      <button
        className="bg-cyan-500 p-1 text-white rounded grow hover:bg-cyan-600 transition-colors cursor-pointer dark:bg-purple-500 dark:hover:bg-purple-600"
        onClick={async () => {
          const { data } = await sendRequest(item.userID);
          if (data) {
            createNotification({
              receiver: [item.userID],
              text: "send you a friend request",
              url: "/friends",
            });
            setSentReq(data);
          }
        }}
      >
        Add friend
      </button>
    );
  }

  return (
    <div className="flex gap-2 bg-white rounded-lg border border-gray-300 md:max-w-[350px] md:max-h-[200px] p-2 shadow dark:bg-slate-900">
      <Link
        className="border border-gray-300 rounded-lg"
        to={`/profile?id=${item?.senderInfo?.userID || item?._id}`}
      >
        <img
          className="w-20 h-20 md:w-full md:h-full rounded-lg hover:brightness-75 transition"
          src={item?.senderInfo?.avatar || item?.avatar}
          alt="sender avatar"
        />
      </Link>
      <div className="flex flex-col grow">
        <div>
          <Link
            to={`/profile?id=${item?.senderInfo?.userID || item?._id}`}
            className="text-sm font-bold hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {item?.senderInfo?.firstName || item?.firstName}{" "}
            {item?.senderInfo?.lastName || item?.lastName}
          </Link>
          <div className="flex items-center text-xs gap-1">
            <MdOutlineAlternateEmail className="text-blue-400" />
            {item?.senderInfo?.email || item?.email}
          </div>
          <div className="flex items-center text-xs gap-1">
            {item?.senderInfo?.gender == 1 ? (
              <BsGenderMale className="text-blue-400" />
            ) : item?.sender?.gender == 2 ? (
              <BsGenderFemale className="text-pink-400" />
            ) : (
              <BsGenderAmbiguous />
            )}{" "}
            {item?.senderInfo?.gender == 1
              ? "Male"
              : item?.senderInfo?.gender == 2
              ? "Female"
              : "Other" || item?.gender}
          </div>
          {item?.senderInfo?.address && (
            <div className="flex text-xs items-center gap-1">
              <AiOutlineHome className="text-yellow-500" />
              {item?.senderInfo?.address || item?.address}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-end grow">
          <div className="flex gap-2 text-xs font-bold">
            {!type ? (
              <>
                <button
                  className="bg-cyan-400 p-1 text-white rounded grow hover:bg-cyan-500 transition-colors cursor-pointer"
                  onClick={() => {
                    acceptRequest({
                      requestID: item?.friendRequestID,
                      sender: item?.senderInfo,
                    });
                    createNotification({
                      receiver: [item?.senderInfo?.userID],
                      text: "accepted your friend request",
                      url: "/friends",
                    });
                  }}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 p-1 text-white rounded grow hover:bg-red-600 transition-colors cursor-pointer"
                  onClick={() => cancelRequest(item?.friendRequestID)}
                >
                  Refuse
                </button>
              </>
            ) : (
              <>{suggestButton}</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
