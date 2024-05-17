import Comment from "./Comment";
import { useState, useEffect } from "react";
import { useGetCommentsQuery } from "../../redux/services/comment.service";
import CommentInput from "./CommentInput";

const CommentSection = ({ user, socket, post }) => {
  const [page, setPage] = useState(0);
  const [commentList, setCommentList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { data } = useGetCommentsQuery({ id: post?.postID, page });
  useEffect(() => {
    if (data?.data?.comments?.length) {
      setCommentList((state) => [...state, ...data?.data?.comments]);
    }
    if (commentList.length <= post?.comments) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [data?.data?.comments]);

  useEffect(() => {
    socket?.socket?.on("createCommentToClient", (newComment) => {
      if (newComment.postID === post?.postID) {
        if (!newComment.reply) {
          setCommentList((state) => [newComment, ...state]);
        }
      }
    });
  }, [socket, post]);

  return (
    <>
      <div className="border-b border-gray-300 dark:border-purple-500" />
      <div className="flex flex-col gap-2 p-4 relative">
        <CommentInput user={user} setCommentList={setCommentList} post={post} />

        {commentList?.map((item, index) => (
          <Comment
            key={item?.commentID}
            pos={index}
            item={item}
            user={user}
            setCommentList={setCommentList}
            commentList={commentList}
            post={post}
            socket={socket}
          />
        ))}
        {hasMore && (
          <p
            className="cursor-pointer inline-block"
            onClick={() => setPage((state) => state + 1)}
          >
            View more comments
          </p>
        )}
      </div>
    </>
  );
};

export default CommentSection;
