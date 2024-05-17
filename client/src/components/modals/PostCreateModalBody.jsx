import EmojiPicker from "../posts/EmojiPicker";
import { BiSmile } from "react-icons/bi";
import TextareaAutosize from "react-textarea-autosize";
import { handleFormChange } from "../../utils/fn";
import PhotoAdder from "./PhotoAdder";
import { forwardRef } from "react";

const PostCreateModalBody = forwardRef(
  (
    {
      postContent,
      setPostContent,
      showEmojiList,
      setShowEmojiList,
      postChoices,
    },
    emojiRef
  ) => {
    return (
      <div className="relative my-4">
        <div className="pstb w-full max-h-[300px] px-4">
          <TextareaAutosize
            autoFocus
            className="w-full text-sm overflow-hidden dark:bg-slate-800"
            style={{ resize: "none", outline: "none" }}
            value={postContent.text}
            name="text"
            placeholder="What's on your mind?"
            maxLength={600}
            onChange={(e) => {
              handleFormChange(e, postContent, setPostContent);
            }}
          />

          <div className="flex justify-end">
            <div ref={emojiRef}>
              <BiSmile
                className="w-6 h-6 text-gray-300 cursor-pointer hover:text-gray-600"
                onClick={() => setShowEmojiList((state) => !state)}
              />
              {showEmojiList && (
                <div className="absolute bottom-4 right-0 translate-x-1/2">
                  <EmojiPicker
                    onEmojiSelect={(e) => {
                      if (postContent.text.length < 600) {
                        setPostContent((state) => ({
                          ...state,
                          text: state.text + e.native,
                        }));
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {(postChoices.images ||
            postContent.images.length > 0 ||
            postContent.videos.length > 0) && (
            <PhotoAdder
              setPostContent={setPostContent}
              postContent={postContent}
            />
          )}
        </div>
      </div>
    );
  }
);

export default PostCreateModalBody;
