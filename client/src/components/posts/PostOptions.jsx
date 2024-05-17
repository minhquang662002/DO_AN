import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import {
  useDeletePostMutation,
  useUnsavePostMutation,
} from "../../redux/services/post.service";
import { FC, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const PostOptions = ({ item, setShowPostOptions, setShowModal, type }) => {
  const [deletePost] = useDeletePostMutation();
  const { setLoading } = useContext(GlobalContext);
  const [unsavePost] = useUnsavePostMutation();
  return (
    <div className="absolute bg-white dark:bg-slate-900 dark:text-white z-20 p-2 border border-gray-300 dark:border-purple-500 shadow-lg rounded-lg min-w-[200px] right-0">
      {type ? (
        <div
          className="flex items-center gap-2 whitespace-nowrap p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-purple-500 rounded-lg"
          onClick={() => {
            unsavePost(item?._id);
            setShowPostOptions(false);
          }}
        >
          <RiEdit2Fill />
          Unsave
        </div>
      ) : (
        <>
          <div
            className="flex items-center gap-2 whitespace-nowrap p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-purple-500 rounded-lg"
            onClick={() => {
              setShowModal((state) => ({ ...state, post: item }));
              setShowPostOptions(false);
            }}
          >
            <RiEdit2Fill />
            Edit post
          </div>
          <div
            className="flex items-center gap-2 whitespace-nowrap p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-purple-500 rounded-lg"
            onClick={async () => {
              setLoading(true);
              await deletePost(item.postID);
              setShowPostOptions(false);
              setLoading(false);
            }}
          >
            <RiDeleteBin6Line />
            Delete
          </div>
        </>
      )}
    </div>
  );
};

export default PostOptions;
