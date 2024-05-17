import { IoEllipsisHorizontalCircle } from "react-icons/io5";
import { useClickOutside } from "../../hooks/hooks";
import { useDeleteCommentMutation } from "../../redux/services/comment.service";
import { useRef } from "react";
const EditCommentButton = ({
  showEditComment,
  setEditComment,
  setShowEditComment,
  item,
  commentList,
  setCommentList,
}) => {
  const [deleteComment] = useDeleteCommentMutation();
  const handleDeleteComment = async () => {
    let updatedList = commentList.filter(
      (cmt) => cmt.commentID !== item?.commentID
    );
    setCommentList(updatedList);
    deleteComment({ commentID: item?.commentID, postID: item?.post?.postID });
  };
  const editRef = useRef();
  useClickOutside(editRef, () => setShowEditComment(false));
  return (
    <div className="hidden relative group-hover:block" ref={editRef}>
      <IoEllipsisHorizontalCircle
        className="w-5 h-5 cursor-pointer"
        onClick={() => {
          setShowEditComment((state) => !state);
        }}
      />
      {showEditComment && (
        <div className="z-20 absolute top-6 bg-white rounded-lg shadow w-48 text-sm font-bold border border-gray-300">
          <p
            className="p-2 cursor-pointer hover:bg-cyan-400 hover:text-white rounded-t transition-colors"
            onClick={() => {
              setEditComment(true);
              setShowEditComment(false);
            }}
          >
            Edit
          </p>
          <p
            className="p-2 cursor-pointer hover:bg-red-500 hover:text-white rounded-b transition-colors"
            onClick={async () => handleDeleteComment()}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default EditCommentButton;
