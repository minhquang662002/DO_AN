import Message from "./Message";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useRef } from "react";

const ChatBoxBody = ({ messages, hasMore, setPage, triggerSwitch }) => {
  const dummyRef = useRef();

  useEffect(() => {
    if (triggerSwitch) {
      dummyRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [triggerSwitch]);

  return (
    <div
      className="flex flex-col-reverse grow overflow-y-auto"
      id="scrollableDiv"
    >
      <div ref={dummyRef} />
      <div className="flex flex-col-reverse p-2 text-sm gap-2 mb-auto">
        <InfiniteScroll
          dataLength={messages?.length}
          next={() => setPage((state) => state + 1)}
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            gap: 5,
            overflow: "unset auto",
          }}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
          inverse={true}
        >
          {messages?.map((item, index) => (
            <Message key={item?._id || index} item={item} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ChatBoxBody;
