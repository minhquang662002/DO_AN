import { HiOutlineUserGroup } from "react-icons/hi";
import { GiExitDoor } from "react-icons/gi";
import { BsPersonPlus } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  useDeleteGroupChatMutation,
  useLeaveGroupMutation,
} from "../../redux/services/message.service";
const ChatBoxSettings = ({ setShowModal, item, user }) => {
  const [deleteGroupChat] = useDeleteGroupChatMutation();
  const [leaveGroup] = useLeaveGroupMutation();
  return (
    <div className="absolute flex flex-col bg-white dark:bg-slate-900 rounded-lg -left-80 top-0 shadow border border-gray-300 dark:border-purple-500 w-72 p-2 text-sm">
      <div
        className="flex items-center gap-1 p-2 hover:bg-gray-200 dark:hover:bg-purple-500 cursor-pointer rounded"
        onClick={() =>
          setShowModal((state) => ({
            ...state,
            group_settings: {
              option: "member",
              ...item,
            },
          }))
        }
      >
        <HiOutlineUserGroup />
        <span>Members</span>
      </div>
      <div
        className="flex items-center gap-1 p-2 hover:bg-gray-200 dark:hover:bg-purple-500 cursor-pointer rounded"
        onClick={() =>
          setShowModal((state) => ({
            ...state,
            group_settings: {
              option: "add",
              ...item,
            },
          }))
        }
      >
        <BsPersonPlus />
        <span>Add member</span>
      </div>
      <div
        className="flex items-center gap-1 p-2 hover:bg-gray-200 dark:hover:bg-purple-500 cursor-pointer rounded"
        onClick={() => leaveGroup(item?._id)}
      >
        <GiExitDoor />
        <span>Leave group</span>
      </div>
      {user?._id === item?.admin && (
        <div
          className="flex items-center gap-1 p-2 hover:bg-gray-200 dark:hover:bg-purple-500 cursor-pointer rounded"
          onClick={() => deleteGroupChat(item._id)}
        >
          <MdOutlineDeleteOutline />
          <span>Delete group</span>
        </div>
      )}
    </div>
  );
};

export default ChatBoxSettings;
