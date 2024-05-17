import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";
import { useEffect, useRef } from "react";

const EmojiPicker = (props) => {
  const ref = useRef(null);
  useEffect(() => {
    new Picker({
      ...props,
      data,
      ref,
      showPreview: false,
      showSkinTones: false,
      emojiTooltip: false,
      searchPosition: "none",
      navPosition: "bottom",
      previewPosition: "none",
      stickySearch: false,
      emojiButtonSize: 20,
      emojiSize: 15,
      perLine: 15,
    });
  }, []);
  return <div ref={ref} />;
};

export default EmojiPicker;
