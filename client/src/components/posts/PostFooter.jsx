import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoArrowRedoOutline } from "react-icons/io5";
import { useCreateNotificationMutation } from "../../redux/services/notification.service";
import {
  useLikePostMutation,
  useUnlikePostMutation,
  useSavePostMutation,
} from "../../redux/services/post.service";

const PostFooter = ({ item, user, showComments, setShowComments }) => {
  const [createNotification] = useCreateNotificationMutation();
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [savePost] = useSavePostMutation();
  return (
    <div
      className="flex items-stretch justify-between 
[&>div]:flex [&>div]:grow [&>div]:items-center [&>div]:justify-center [&>div]:gap-2 [&>div]:p-2 [&>div]:transition-colors
[&>div]:cursor-pointer dark:text-stone-200"
    >
      <div
        className={`${
          item?.likes?.includes(user?.userID)
            ? "text-white bg-cyan-400 dark:bg-purple-500"
            : `hover:bg-cyan-400 dark:hover:bg-purple-500 ${
                showComments ? "" : "hover:rounded-bl-lg"
              } hover:text-white`
        } ${showComments ? "" : "rounded-bl-lg"}`}
        onClick={() => {
          item?.likes?.includes(user?.userID)
            ? unlikePost({
                data: {
                  likes: item?.likes?.filter((item) => item !== user?.userID),
                },
                id: item?.postID,
                owner: item?.owner,
              })
            : likePost({
                data: {
                  likes: item?.likes
                    ? [...item?.likes, user?.userID]
                    : [user?.userID],
                },
                id: item?.postID,
                owner: item?.owner,
              });

          if (item?.owner?.userID !== user?.userID) {
            createNotification({
              text: "liked your post",
              receiver: item?.likes
                ? [item?.owner?.userID, ...item?.likes].join(",")
                : [item?.owner?.userID].join(","),
              url: "thinking",
            });
          }
        }}
      >
        {item?.likes?.includes(user?.userID) ? (
          <AiFillLike className="w-5 h-5" />
        ) : (
          <AiOutlineLike className="w-5 h-5" />
        )}
        {item?.likes?.includes(user?.userID) ? "Liked" : "Like"}
      </div>
      <div
        className="border-x border-gray-300 dark:border-purple-500 hover:bg-cyan-400 dark:hover:bg-purple-500 hover:text-white"
        onClick={() => setShowComments(true)}
      >
        <FaRegCommentAlt className="w-4 h-4" />
        Comment
      </div>
      <div
        className={`${
          showComments ? "" : "rounded-br-lg"
        }  hover:bg-cyan-400 dark:hover:bg-purple-500 hover:text-white`}
        onClick={() => savePost(item?.postID)}
      >
        <IoArrowRedoOutline className="w-5 h-5" />
        Save
      </div>
    </div>
  );
};

export default PostFooter;
