import { useState, useRef, useContext } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useClickOutside } from "../../hooks/hooks";
import { GlobalContext } from "../context/GlobalContext";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { addFile, fileCheck } from "../../utils/fn";
import PostCreateModalHeader from "./PostCreateModalHeader";
import PostCreateModalBody from "./PostCreateModalBody";
import PostCreateModalFooter from "./PostCreateModalFooter";
import { toast } from "react-toastify";

const PostCreateModal = () => {
  const { showModal, setShowModal, postChoices, setPostChoices, setLoading } =
    useContext(GlobalContext);
  const [postContent, setPostContent] = useState({
    text: showModal?.post?.text || "",
    images: showModal?.post?.images || [],
    videos: showModal?.post?.videos || [],
  });
  const { user } = useSelector((state) => state.auth);
  const emojiRef = useRef();
  const modalRef = useRef();
  const fileValidator = (file) => {
    let error = fileCheck(file);
    if (error) {
      return toast.error(error);
    }
  };
  const [showEmojiList, setShowEmojiList] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    validator: fileValidator,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "video/mp4": [".mp4"],
      "video/webm": [".webm"],
    },

    onDrop: (acceptedFiles) => {
      addFile(acceptedFiles, setPostContent);
    },
  });

  useClickOutside(emojiRef, () => setShowEmojiList(false));
  useClickOutside(modalRef, () => {
    setShowModal((state) => ({ ...state, post: false }));
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col w-[500px] bg-white dark:bg-slate-800 dark:text-white rounded-lg !opacity-100"
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
    >
      <input {...getInputProps()} />
      <div className="relative text-center py-2">
        <p className="font-bold text-xl text-slate-600">
          {showModal.post === true ? "Create post" : "Edit post"}
        </p>
        <FaTimesCircle
          className="absolute text-gray-500  right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:text-red-600"
          onClick={() => setShowModal(false)}
        />
      </div>

      <div className="border-b border-slate-300 " />

      <div className="flex flex-col text-sm">
        <PostCreateModalHeader user={user} />
        <PostCreateModalBody
          postContent={postContent}
          setPostContent={setPostContent}
          showEmojiList={showEmojiList}
          setShowEmojiList={setShowEmojiList}
          ref={emojiRef}
          postChoices={postChoices}
          showModal={showModal}
        />
        <PostCreateModalFooter
          postContent={postContent}
          postChoices={postChoices}
          setPostChoices={setPostChoices}
          showModal={showModal}
          setShowModal={setShowModal}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default PostCreateModal;
