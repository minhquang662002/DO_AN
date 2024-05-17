import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

const PostCreate = ({ user }) => {
  const { setShowModal } = useContext(GlobalContext);

  return (
    <div className="flex flex-col gap-2 w-full border border-gray-300 dark:border-purple-500 shadow-lg rounded-lg p-2 bg-white dark:bg-slate-900">
      <div className="flex gap-2">
        <Link to={`/profile?id=${user?._id}`}>
          <img
            className="w-10 h-10 rounded-full border border-gray-300"
            src={`${user?.avatar}`}
            alt="auth_user"
          />
        </Link>
        <div
          className="flex items-center flex-grow rounded-full px-4 text-xs text-gray-600 dark:text-stone-300 bg-slate-200 dark:bg-slate-700 cursor-pointer transition hover:bg-gray-300 dark:hover:bg-slate-800"
          onClick={() => {
            setShowModal((state) => ({ ...state, post: true }));
          }}
        >
          What's in your mind?
        </div>
      </div>
      {/* <div className="border-b border-gray-300 dark:border-purple-500" /> */}
      {/* <div
        className="flex text-sm text-slate-600 dark:text-white
      [&>div]:flex [&>div]:justify-center [&>div]:items-center [&>div]:text-xs [&>div]:whitespace-nowrap 
      [&>div]:gap-2 [&>div]:flex-1 [&>div]:cursor-pointer [&>div]:rounded-lg [&>div]:p-2 
      [&>div:hover]:bg-sky-200 dark:[&>div:hover]:bg-purple-500"
      >
        <div>
          <BsFillCameraVideoFill className="w-6 h-6 text-red-600" />
          <span>Live video</span>
        </div>
        <div>
          <BsFileImage className="w-6 h-6 text-green-400" />
          <span>Photo/Video</span>
        </div>
        <div>
          <RiEmotionHappyFill className="w-6 h-6 text-yellow-300" />
          <span>Feeling/Activity</span>
        </div>
      </div> */}
    </div>
  );
};

export default PostCreate;
