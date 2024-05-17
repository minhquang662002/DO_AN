import ChatBoxHeader from "./ChatBoxHeader";
import ChatBoxBody from "./ChatBoxBody";
import ChatBoxFooter from "./ChatBoxFooter";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import {
  useGetGroupMessagesQuery,
  useGetSingleMessagesQuery,
} from "../../redux/services/message.service";
import { useSelector } from "react-redux";

const ChatBox = ({ item }) => {
  const { setShowChatBox, setShowModal } = useContext(GlobalContext);
  const [hasMore, setHasMore] = useState(true);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const {
    socket,
    auth: { user },
    online,
  } = useSelector((state) => state);
  const { data: singleMsg = [], isLoading: singleLoading } =
    useGetSingleMessagesQuery(
      { page, id: item.userID },
      { skip: !(item?.type === "single") }
    );
  const { data: groupMsg = [], isLoading: groupLoading } =
    useGetGroupMessagesQuery(
      { page, id: item.conversationID },
      { skip: !(item?.type === "group") }
    );
  const [triggerSwitch, setTriggerSwitch] = useState(false);
  useEffect(() => {
    if (item?.type === "single") {
      if (singleMsg?.data?.length) {
        setMessages((state) => [...state, ...singleMsg.data]);
        setHasMore(true);
        setTriggerSwitch(false);
      } else {
        setHasMore(false);
      }
    }
  }, [singleMsg, item?.type]);

  useEffect(() => {
    if (item?.type === "group") {
      if (groupMsg.length) {
        setMessages((state) => [...state, ...groupMsg]);
        setHasMore(true);
        setTriggerSwitch(false);
      } else {
        setHasMore(false);
      }
    }
  }, [groupMsg, item?.type]);

  useEffect(() => {
    socket.socket.on("sendMessageToClient", (newMessage) => {
      if (item?.type === "single") {
        if (newMessage.receiver === user.userID) {
          setMessages((state) => [newMessage, ...state]);
        }
      }
      if (item?.type === "group") {
        if (newMessage.conversation.conversationID === item?.conversationID) {
          setMessages((state) => [newMessage, ...state]);
        }
      }
    });
  }, [socket, item, user]);

  return (
    <div className="flex flex-col w-80 h-120 bg-white dark:bg-slate-900 dark:text-white rounded border border-gray-300 dark:border-purple-500 shadow">
      <ChatBoxHeader
        setShowChatBox={setShowChatBox}
        setShowModal={setShowModal}
        item={item}
        online={online}
        user={user}
      />
      {singleLoading || groupLoading ? (
        <div className="grow" />
      ) : (
        <ChatBoxBody
          messages={messages}
          page={page}
          setPage={setPage}
          hasMore={hasMore}
          item={item}
          triggerSwitch={triggerSwitch}
        />
      )}
      <ChatBoxFooter
        item={item}
        setMessages={setMessages}
        setTriggerSwitch={setTriggerSwitch}
        user={user}
      />
    </div>
  );
};

export default ChatBox;
