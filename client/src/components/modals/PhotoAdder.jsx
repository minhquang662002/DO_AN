import { BsFileImage } from "react-icons/bs";
import { FaRegTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { addFile, fileCheck } from "../../utils/fn";
import MediaDisplay from "../layout/MediaDisplay";
const PhotoAdder = ({ postContent, setPostContent }) => {
  let com;

  if (postContent.images.length > 0 || postContent.videos.length > 0) {
    com = (
      <>
        <div className="relative">
          <MediaDisplay
            images={postContent.images}
            videos={postContent.videos}
          />
          <div className="absolute w-full flex items-center justify-between px-4 top-2">
            <div className="flex">
              <label
                htmlFor="upload"
                className="flex items-center gap-x-2 bg-white shadow text-xs p-2 font-bold rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <BsFileImage />
                <span>Add more Photos/Videos</span>
              </label>
            </div>
            <FaRegTimesCircle
              className="w-6 h-6 text-white cursor-pointer shadow rounded-full"
              onClick={() =>
                setPostContent((state) => ({
                  ...state,
                  images: [],
                  videos: [],
                }))
              }
            />
          </div>
        </div>
        <input
          id="upload"
          type="file"
          accept="image/*|video/*"
          className="hidden"
          multiple
          onChange={(e) => {
            if (e.target.files.length > 0) {
              const files = [...e.target.files];
              let error = "";
              for (let i = 0; i < files.length; i++) {
                if (error) {
                  break;
                }
                error = fileCheck(files[i]);
              }
              if (error) {
                return toast.error(error);
              }
              addFile(files, setPostContent);
            }
          }}
          onClick={(event) => {
            event.target.value = null;
          }}
        />
      </>
    );
  } else {
    com = (
      <>
        <label
          htmlFor="upload"
          className="flex shrink-0 mx-4 my-4 h-48 items-center justify-center bg-gray-500 rounded-lg text-white group hover:bg-gray-400 transition cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-600 group-hover:bg-gray-500 transition">
              <BsFileImage className="w-6 h-6 text-white" />
            </div>

            <p className="text-sm">Add photos/videos</p>
            <p className="text-xs">or drag and drop</p>
          </div>
        </label>
        <input
          id="upload"
          type="file"
          accept="image/*|video/*"
          className="hidden"
          multiple
          onChange={(e) => {
            if (e.target.files.length > 0) {
              const files = [...e.target.files];
              let error = "";
              for (let i = 0; i < files.length; i++) {
                if (error) {
                  break;
                }
                error = fileCheck(files[i]);
              }
              if (error) {
                return toast.error(error);
              }
              addFile(files, setPostContent);
            }
          }}
          onClick={(event) => {
            event.target.value = null;
          }}
        />
      </>
    );
  }

  return <>{com}</>;
};

export default PhotoAdder;
