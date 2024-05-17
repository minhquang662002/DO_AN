import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";
import {
  useLikeCommentMutation,
  useUnlikeCommentMutation,
  useGetRepliesQuery,
} from "../../redux/services/comment.service";
import { handleLikeComment } from "../../utils/fn";
import EditCommentButton from "./EditCommentButton";
import CommentInput from "./CommentInput";
import ReplySection from "./ReplySection";
import { Link } from "react-router-dom";

const Comment = ({
  item,
  user,
  pos,
  setCommentList,
  commentList,
  post,
  socket,
  replyList,
  setReplyList,
}) => {
  const [editComment, setEditComment] = useState(false);
  const [showEditComment, setShowEditComment] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [likeComment] = useLikeCommentMutation();
  const [unlikeComment] = useUnlikeCommentMutation();
  const [replies, setReplies] = useState([]);
  const [replyPage, setReplyPage] = useState(-1);
  const { data = [] } = useGetRepliesQuery(
    { commentID: item?.commentID, page: replyPage },
    { skip: replyPage < 0 || replies.length > item?.replyTotal }
  );

  useEffect(() => {
    if (data.length) {
      setReplies((state) => [...state, ...data]);
    }
  }, [data, setReplies]);

  useEffect(() => {
    socket?.socket?.on("createCommentToClient", (newComment) => {
      if (newComment.postID === post.postID) {
        if (newComment.reply) {
          setReplies((state) => [newComment, ...state]);
        }
      }
    });
  }, [socket, post]);

  return (
    <>
      {editComment ? (
        <CommentInput
          user={user}
          setCommentList={setCommentList}
          setEditComment={setEditComment}
          post={post}
          type="edit"
          item={item}
          pos={pos}
        />
      ) : (
        <div
          className={`flex gap-2 text-xs text-black dark:text-stone-200 ${
            item?.reply ? "pl-10" : ""
          }`}
        >
          <Link to={`/profile?id=${item?.owner?.userID}`}>
            <img
              className={`bg-center bg-cover bg-no-repeat border border-slate-300 shrink-0 rounded-full ${
                item?.reply ? "w-6 h-6" : "w-8 h-8"
              }`}
              style={{ backgroundImage: `url(${item?.owner.avatar})` }}
              src={`${item?.owner?.avatar}`}
              alt="test"
            />
          </Link>
          <div className="flex flex-col flex-grow relative">
            <div className="flex gap-2 items-center group">
              <div className="flex flex-col bg-gray-200 dark:bg-slate-800 rounded-2xl p-3">
                <Link to={`/profile?id=${item?.owner?.userID}`}>
                  <p className="font-bold hover:underline">
                    {item?.owner.firstName} {item?.owner.lastName}
                  </p>
                </Link>
                <p className="text-tiny">{item?.text}</p>
              </div>

              {(user?.userID === item?.owner.userID ||
                post?.owner.userID === item?.post?.owner.userID) && (
                <EditCommentButton
                  editComment={editComment}
                  setEditComment={setEditComment}
                  setShowEditComment={setShowEditComment}
                  showEditComment={showEditComment}
                  item={item}
                  commentList={commentList}
                  setCommentList={setCommentList}
                />
              )}
            </div>
            <div className="mt-2 max-w-[150px]">
              {item?.image && (
                <img className="rounded-lg" src={item?.image} alt="postimg" />
              )}
              {item?.video && (
                <video
                  className="rounded-lg"
                  src={item?.video}
                  alt="postvideo"
                />
              )}
            </div>
            {!editComment && (
              <>
                {item?.likes.length > 0 && (
                  <div className="flex gap-1 p-1 rounded-2xl border border-gray-300 bg-white shadow-lg absolute bottom-2 right-2">
                    <FaThumbsUp className="text-blue-500" />
                    <span>{item?.likes.length}</span>
                  </div>
                )}
                <div className="flex gap-2 px-2 text-gray-600">
                  <span
                    className={`${
                      item?.likes.includes(user?.userID)
                        ? "text-blue-600"
                        : "hover:underline hover:text-sky-600"
                    } font-bold cursor-pointer`}
                    onClick={() =>
                      handleLikeComment(
                        item?.likes.includes(user?.userID),
                        item?.commentID,
                        pos,
                        user,
                        item?.reply ? replyList : commentList,
                        item?.reply ? setReplyList : setCommentList,
                        likeComment,
                        unlikeComment
                      )
                    }
                  >
                    Like
                  </span>
                  <span
                    className="font-bold hover:underline cursor-pointer"
                    onClick={() => {
                      if (!item?.reply) {
                        setShowReply(true);
                      }
                    }}
                  >
                    Reply
                  </span>
                  <span className="text-xxs">
                    {dayjs().from(dayjs(item?.createdAt), true)}
                  </span>
                </div>
              </>
            )}

            {!!item?.replyCount && !showReply && (
              <p
                className="cursor-pointer hover:underline mt-2 ml-2"
                onClick={() => {
                  setShowReply(true);
                  setReplyPage((state) => state + 1);
                }}
              >
                {item.replyCount} replies
              </p>
            )}
          </div>
        </div>
      )}
      {showReply && (
        <ReplySection
          user={user}
          item={item}
          post={post}
          replies={replies}
          replyList={replies}
          setReplyList={setReplies}
          setShowReply={setShowReply}
          setReplyPage={setReplyPage}
        />
      )}

      {showReply && (
        <CommentInput
          user={user}
          item={item}
          setReplies={setReplies}
          post={post}
          pos={pos}
          type="reply"
        />
      )}
    </>
  );
};

export default Comment;
