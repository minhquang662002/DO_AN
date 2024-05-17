import { useState, useRef, useEffect } from "react";
import Message from "../chat/Message";
import {
  useGetSingleMessagesQuery,
  useGetGroupMessagesQuery,
} from "../../redux/services/message.service";
import InfiniteScroll from "react-infinite-scroll-component";
import MessengerRightFooter from "./MessengerRightFooter";
import MessengerRightHeader from "./MessengerRightHeader";

const MessengerRight = ({ selectedConver, user }) => {
  const [hasMore, setHasMore] = useState(true);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [messageValue, setMessageValue] = useState({
    text: "",
    images: [],
    videos: [],
  });

  const { data: singleMsg = [] } = useGetSingleMessagesQuery(
    { page, id: selectedConver?.target?.userID },
    {
      skip: !(selectedConver?.type === "single"),
    }
  );
  const { data: groupMsg = [] } = useGetGroupMessagesQuery(
    { page, id: selectedConver?.conversationID },
    {
      skip: !(selectedConver?.type === "group"),
    }
  );

  useEffect(() => {
    if (selectedConver?.type === "single") {
      if (singleMsg?.data?.length) {
        setMessages((state) => [...state, ...singleMsg?.data]);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    }
  }, [singleMsg, selectedConver?.type]);

  useEffect(() => {
    if (selectedConver?.type === "group") {
      if (groupMsg.length) {
        setMessages((state) => [...state, ...groupMsg]);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    }
  }, [groupMsg, selectedConver?.type]);
  useEffect(() => {
    return () => {
      setMessages([]);
    };
  }, [selectedConver]);

  const dummyRef = useRef();
  return (
    <div className="w-[75%] flex flex-col pt-2 px-2 grow">
      <MessengerRightHeader selectedConver={selectedConver} />
      <div
        className="flex flex-col-reverse grow overflow-y-auto"
        id="scrollableDiv"
      >
        <div ref={dummyRef} />
        <div className="flex flex-col-reverse p-2 text-sm gap-2 h-0">
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
      <MessengerRightFooter
        messageValue={messageValue}
        setMessageValue={setMessageValue}
        setMessages={setMessages}
        selectedConver={selectedConver}
        user={user}
      />
    </div>
  );
};

export default MessengerRight;
