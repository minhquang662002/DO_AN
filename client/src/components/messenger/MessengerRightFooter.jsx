import { BiSmile } from "react-icons/bi";
import { BsFileImage } from "react-icons/bs";
import ReactTextareaAutosize from "react-textarea-autosize";
import EmojiPicker from "../posts/EmojiPicker";
import { handleFormChange, addFile, uploadFile } from "../../utils/fn";
import { useSendMessageMutation } from "../../redux/services/message.service";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import { useClickOutside } from "../../hooks/hooks";

const MessengerRightFooter = ({
  messageValue,
  setMessageValue,
  setMessages,
  selectedConver,
  user,
}) => {
  const [sendMessage] = useSendMessageMutation();
  const [showEmojiList, setShowEmojiList] = useState(false);
  const emojiRef = useRef();
  const handleMessage = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (
        !messageValue.text.trim().length &&
        !messageValue.videos.length &&
        !messageValue.images.length
      ) {
        return;
      } else {
        if (messageValue.images.length > 4 || messageValue.videos.length > 4) {
          return toast.error("Maxium number of images and videos are 4");
        }
        setMessageValue({ text: "", videos: [], images: [], call: {} });
        setMessages((state) => [{ ...messageValue, sender: user }, ...state]);
        if (messageValue.images.length > 0) {
          var imagesUrl = await uploadFile(messageValue.images);
        }
        if (messageValue.videos.length > 0) {
          var videosUrl = await uploadFile(messageValue.videos);
        }

        await sendMessage({
          data: {
            ...messageValue,
            images: imagesUrl || [],
            videos: videosUrl || [],
          },
          receiver:
            selectedConver?.type === "group"
              ? selectedConver?.receiver
              : selectedConver?.target?._id,
          conveID:
            selectedConver?.type === "group" ? selectedConver?._id : undefined,
          type: selectedConver?.type,
        });
      }
    }
  };
  useClickOutside(emojiRef, () => setShowEmojiList(false));
  return (
    <div className="flex flex-col">
      {(messageValue.images.length > 0 || messageValue.videos.length > 0) && (
        <div className="relative flex gap-4">
          {messageValue.images.map((item) => (
            <img
              className="w-28"
              key={item?.preview}
              src={item?.preview}
              alt="mesImg"
            />
          ))}
          <div
            className="absolute right-0 top-1/2"
            onClick={() =>
              setMessageValue((state) => ({
                ...state,
                videos: [],
                images: [],
              }))
            }
          >
            close
          </div>
        </div>
      )}
      <div className="flex dark:bg-slate-900 p-2 items-center gap-2 relative">
        <ReactTextareaAutosize
          className="grow dark:bg-slate-700 bg-gray-300 p-1 px-2 rounded-full"
          placeholder="Aa"
          value={messageValue.text}
          name="text"
          onChange={(e) => handleFormChange(e, messageValue, setMessageValue)}
          onKeyDown={(e) => handleMessage(e)}
          style={{ outline: "none", resize: "none" }}
        />
        <div className="flex items-center">
          <div ref={emojiRef}>
            <BiSmile onClick={() => setShowEmojiList((state) => !state)} />
            {showEmojiList && (
              <div className="absolute bottom-[95%] right-0 z-20">
                <EmojiPicker
                  onEmojiSelect={(e) => {
                    if (messageValue.text.length < 600) {
                      setMessageValue((state) => ({
                        ...state,
                        text: state.text + e.native,
                      }));
                    }
                  }}
                />
              </div>
            )}
          </div>
          <label htmlFor="file">
            <BsFileImage />
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={(e) => addFile([...e.target.files], setMessageValue, "")}
            onClick={(e) => {
              e.target.value = null;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessengerRightFooter;
