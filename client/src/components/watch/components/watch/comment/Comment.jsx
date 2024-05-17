import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const Comment = ({ item }) => {
  return (
    <div className="inline-flex flex-col">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex gap-x-2 items-center">
          <div
            className="bg-center bg-cover w-10 h-10 rounded-full border border-gray-600 shrink-0"
            style={{ backgroundImage: `url(${item?.photoURL})` }}
          />
          <div className="text-sm">
            <p>{item.username}</p>
            <p className="text-xs">{dayjs(item.createdAt)?.fromNow()}</p>
          </div>
        </div>
        <p>{item.content}</p>
      </div>
      <div className="inline-flex gap-x-2 text-sm px-2 my-2 cursor-pointer">
        <span className="hover:text-red-600 transition-colors">Like</span>
        <span className="hover:text-red-600 transition-colors">Reply</span>
      </div>
    </div>
  );
};

export default Comment;
