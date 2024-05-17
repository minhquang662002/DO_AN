import { BsFileImage } from "react-icons/bs";
import { FaUserTag } from "react-icons/fa";
import { handleCreatePost, handleEditPost } from "../../utils/fn";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../../redux/services/post.service";
const PostCreateModalFooter = ({
  postContent,
  postChoices,
  setPostChoices,
  showModal,
  setShowModal,
  setLoading,
}) => {
  const [createPost] = useCreatePostMutation();
  const [editPost] = useUpdatePostMutation();
  const handlePost = async () => {
    setLoading(true);
    showModal.post === true
      ? await handleCreatePost(postContent, createPost)
      : await handleEditPost(
          showModal.post,
          postContent,
          editPost,
          showModal.post.postID
        );
    setLoading(false);
    setShowModal((state) => ({ ...state, post: false }));
  };
  return (
    <div>
      <div className="flex justify-between items-center border border-gray-300 rounded-lg text-sm p-2 mx-4">
        <span>Add to your post</span>

        <div className="flex items-center">
          <div
            className={`w-10 h-10 flex justify-center items-center hover:bg-gray-300 rounded-full cursor-pointer ${
              postChoices.images ? "bg-gray-300" : ""
            }`}
            onClick={() => {
              setPostChoices((state) => ({ ...state, images: !state.images }));
            }}
          >
            <BsFileImage className="w-6 h-6 text-green-400" />
          </div>
          <div className="w-10 h-10 flex justify-center items-center hover:bg-gray-300 rounded-full cursor-pointer">
            <FaUserTag className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="mx-4">
        <button
          className="w-full bg-blue-500 dark:bg-purple-500 text-white p-2 text-center rounded-lg my-4 cursor-pointer hover:bg-blue-700"
          onClick={() => handlePost()}
        >
          {showModal.post === true ? "Post" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default PostCreateModalFooter;
