import { FaTimesCircle } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { BiSmile } from "react-icons/bi";
import { BsFileImage } from "react-icons/bs";
import { useClickOutside } from "../../hooks/hooks";
import TextareaAutosize from "react-textarea-autosize";
import EmojiPicker from "../posts/EmojiPicker";
import { useRef, useState } from "react";
import {
  handleFormChange,
  addFile,
  handleCreateComment,
  handleEditComment,
} from "../../utils/fn";
import {
  useCreateCommentMutation,
  useUpdateCommentMutation,
} from "../../redux/services/comment.service";
import { checkType } from "../../utils/fn";
const CommentInput = ({
  user,
  post,
  item,
  pos,
  setCommentList,
  setEditComment,
  setReplies,
  type = "create",
}) => {
  const [newLine, setNewLine] = useState(-1);
  const [showEmojiList, setShowEmojiList] = useState(false);
  const [createComment] = useCreateCommentMutation();
  const [editComment] = useUpdateCommentMutation();
  const [commentContent, setCommentContent] = useState({
    text: type === "edit" ? item?.text : "",
    image: type === "edit" ? item?.image : "",
    video: type === "edit" ? item?.video : "",
  });
  const emojiRef = useRef();
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "video/mp4": [".mp4"],
      "video/webm": [".webm"],
    },
    onDrop: (acceptedFile) => {
      addFile([...acceptedFile], setCommentContent, "single");
    },
  });
  useClickOutside(emojiRef, () => setShowEmojiList(false));

  return (
    <div
      className={`flex items-start gap-2 my-2 ${item?.reply ? "pl-10" : ""}`}
    >
      <img
        className={`${
          item?.reply ? "w-6 h-6" : "w-8 h-8"
        } border border-gray-300 dark:border-purple-500 rounded-full shrink-0 bg-cover bg-center`}
        src={`${user?.avatar}`}
        alt="auth_user"
      />
      <div className="grow">
        <div
          className="flex flex-grow flex-wrap p-2 bg-gray-200 dark:bg-slate-700 rounded-2xl"
          {...getRootProps()}
          onClick={(e) => e.stopPropagation()}
        >
          <TextareaAutosize
            autoFocus
            className={`px-2 ${
              newLine ? "w-full" : "flex-grow"
            } bg-gray-200 dark:bg-slate-700 dark:text-white rounded-2xl`}
            onHeightChange={() => {
              setNewLine((state) => state + 1);
            }}
            placeholder={
              type === "reply" ? "Write a reply..." : "Write a comment..."
            }
            value={commentContent.text}
            name="text"
            onChange={(e) => {
              handleFormChange(e, commentContent, setCommentContent);
            }}
            style={{ outline: "none", resize: "none" }}
            onKeyDown={(e) => {
              if (type === "edit") {
                handleEditComment(
                  e,
                  { ...commentContent, postID: post?.postID },
                  setCommentContent,
                  editComment,
                  item?.commentID,
                  setCommentList,
                  pos,
                  setEditComment
                );
              } else {
                handleCreateComment(
                  e,
                  commentContent,
                  setCommentContent,
                  createComment,
                  {
                    postID: post?.postID,
                    commentID:
                      type === "reply"
                        ? item?.reply
                          ? item.reply
                          : item?.commentID
                        : null,
                  },
                  type === "reply" ? setReplies : setCommentList
                );
              }
            }}
          />
          <input {...getInputProps()} />
          <div className="flex items-center gap-2 ml-auto self-end dark:text-stone-300">
            <div ref={emojiRef}>
              <BiSmile
                className="w-4 cursor-pointer hover:text-cyan-400 dark:hover:text-purple-500"
                onClick={() => setShowEmojiList((state) => !state)}
              />
              {showEmojiList && (
                <div className="absolute bottom-[95%] right-0 translate-x-1/2 z-20">
                  <EmojiPicker
                    onEmojiSelect={(e) => {
                      if (commentContent.text.length < 600) {
                        setCommentContent((state) => ({
                          ...state,
                          text: state.text + e.native,
                        }));
                      }
                    }}
                  />
                </div>
              )}
            </div>

            <label htmlFor={`commentFile${type}`}>
              <BsFileImage className="w-4" />
            </label>
            <input
              id={`commentFile${type}`}
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) =>
                addFile([...e.target.files], setCommentContent, "single")
              }
              onClick={(e) => (e.target.value = null)}
            />
          </div>
        </div>

        <div className="relative max-w-[150px]">
          {checkType(commentContent.image, "mt-2")}
          {checkType(commentContent.video, "mt-2")}
          {type === "edit" && (
            <p
              className="text-xxs ml-2 text-blue-400 cursor-pointer hover:underline"
              onClick={() => setEditComment(false)}
            >
              Cancel
            </p>
          )}
          {(commentContent.image || commentContent.video) && (
            <FaTimesCircle
              className="absolute top-2 right-0 w-6 text-white cursor-pointer"
              onClick={() =>
                setCommentContent((state) => ({
                  ...state,
                  video: "",
                  image: "",
                }))
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
