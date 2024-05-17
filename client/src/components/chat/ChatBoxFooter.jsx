import { GrEmoji } from "react-icons/gr";
import { FiImage } from "react-icons/fi";
import TextareaAutosize from "react-textarea-autosize";
import EmojiPicker from "../posts/EmojiPicker";
import { useState, useRef } from "react";
import { handleFormChange, addFile, uploadFile } from "../../utils/fn";
import { useClickOutside } from "../../hooks/hooks";

import { toast } from "react-toastify";
import { useSendMessageMutation } from "../../redux/services/message.service";
const ChatBoxFooter = ({ item, setMessages, user }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [messageValue, setMessageValue] = useState({
    text: "",
    images: [],
    videos: [],
  });
  const [sendMessage] = useSendMessageMutation();
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
        setMessageValue({ text: "", videos: [], images: [], call: null });
        setMessages((state) => [
          { ...messageValue, senderInfo: user },
          ...state,
        ]);
        if (messageValue.images.length > 0) {
          var imagesUrl = await uploadFile(messageValue.images);
        }
        if (messageValue.videos.length > 0) {
          var videosUrl = await uploadFile(messageValue.videos);
        }

        await sendMessage({
          data: {
            ...messageValue,
            images: imagesUrl || null,
            videos: videosUrl || null,
          },
          receiver:
            item?.type === "group" ? item?.receiver.userID : item?.userID,
          conversationID: item?.conversationID,
          type: item?.type,
        });
      }
    }
  };
  useClickOutside(emojiRef, () => setShowEmoji(false));
  return (
    <div className="flex flex-col">
      <div className="p-2 flex">
        {messageValue.images.map((item) => (
          <img
            className="w-24"
            key={item.preview}
            src={item.preview}
            alt="mes"
          />
        ))}
        {messageValue.videos.map((item) => (
          <img
            className="w-24"
            key={item.preview}
            src={item.preview}
            alt="mes"
          />
        ))}
      </div>
      <div className="flex gap-2 p-2 ">
        <TextareaAutosize
          autoFocus
          className="grow bg-slate-200 dark:bg-slate-700 rounded-lg p-1 text-sm"
          style={{ resize: "none", outline: "none" }}
          placeholder="Aa"
          value={messageValue.text}
          onChange={(e) => {
            handleFormChange(e, messageValue, setMessageValue);
          }}
          name="text"
          onKeyDown={(e) => {
            handleMessage(e);
          }}
        />
        <div className="flex items-center gap-1">
          <div className="relative" ref={emojiRef}>
            <GrEmoji
              className="cursor-pointer"
              onClick={() => setShowEmoji((state) => !state)}
            />
            {showEmoji && (
              <div className="absolute right-0 bottom-[95%] z-20">
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
            <FiImage className="cursor-pointer" />
          </label>
        </div>
        <input
          id="file"
          type="file"
          className="hidden"
          onChange={(e) => addFile([...e.target.files], setMessageValue, "")}
        />
      </div>
    </div>
  );
};

export default ChatBoxFooter;
