import Comment from "./Comment";
import { postComment } from "../../../utils/api";
import { useState, useMemo } from "react";
import { handleFormChange } from "../../../utils/api";
import Link from "next/link";
import { useFirestore } from "../../../hooks/useFirestore";
import { memo } from "react";

const CommentSection = ({ media_type, user, id }) => {
  const commentCondition = useMemo(() => {
    return {
      fieldName: "id",
      operator: "==",
      compareValue: `${media_type}${id}`,
    };
  }, [media_type, id]);

  const comments = useFirestore("comments", commentCondition);
  const [commentValue, setCommentValue] = useState({ content: "" });
  const onEnterPress = (e) => {
    if (e.code === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      setCommentValue({ content: "" });
      postComment(media_type, id, commentValue.content);
    }
  };

  let body;

  if (user) {
    body = (
      <>
        {comments.length === 0 && (
          <p className="text-center">Be first to comment on this!</p>
        )}
        <div className="flex gap-x-2 my-10">
          <div
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white bg-center bg-cover shrink-0"
            style={{ backgroundImage: `url(${user?.photoURL})` }}
          />
          <textarea
            className="w-full bg-gray-900 rounded-lg p-4 resize-none"
            type="text"
            name="content"
            placeholder="Write your comment..."
            value={commentValue.content}
            onChange={(e) => handleFormChange(e, commentValue, setCommentValue)}
            onKeyDown={onEnterPress}
          />
        </div>
        <div className="flex flex-col">
          {comments.map((item, index) => (
            <Comment item={item} key={index} />
          ))}
        </div>
      </>
    );
  } else {
    body = (
      <>
        <p className="text-center">
          <Link href="/login">
            <span className="text-red-600 cursor-pointer hover:underline">
              Login
            </span>
          </Link>{" "}
          to comment
        </p>

        <div className="flex flex-col">
          {comments.map((item, index) => (
            <Comment item={item} key={index} />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold my-8">Comments</h2>
      {body}
    </div>
  );
};

export default memo(CommentSection);
