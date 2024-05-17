import { Outlet } from "react-router-dom";
import { useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { updateSocket } from "../../redux/slices/socketSlice";
import { PeerContext } from "../context/PeerContext";
import { GlobalContext } from "../context/GlobalContext";
import Wrapper from "../modals/Wrapper";
import PostCreateModal from "../modals/PostCreateModal";
import Navbar from "../navbar/Navbar";
import ScrollToTop from "./ScrollToTop";
import EditProfile from "../modals/EditProfileModal";
import ChatBox from "../chat/ChatBox";
import CreateGroupChatModal from "../modals/CreateGroupChatModal";
import GroupSettingsModal from "../modals/GroupSettingsModal";
import SocketClient from "../../SocketClient";
import CallModal from "../chat/CallModal";
import VideoChatModal from "../chat/VideoChatModal";
import LoadingLayout from "./LoadingLayout";
import { apiUrl } from "../../utils/constants";
import ConfirmModal from "../modals/ConfirmModal";
import { useLocation } from "react-router-dom";
import {
  useGetLoggedUserQuery,
  useRefreshTokenMutation,
} from "../../redux/services/auth.service";
import { useGetRequestsQuery } from "../../redux/services/friendRequest.service";
import { useDispatch, useSelector } from "react-redux";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { LogLevel } from "@microsoft/signalr";
import { addOnline } from "../../redux/slices/onlineSlice";
import { addPost } from "../../redux/slices/postSlice";

const ProtectedRoute = () => {
  const [refreshToken] = useRefreshTokenMutation();
  const { token, user } = useSelector((state) => state.auth);
  const { online } = useSelector((state) => state);
  const { showModal, setShowModal, showChatBox, loading, setLoading } =
    useContext(GlobalContext);
  const { pathname } = useLocation();
  const {
    call,
    stream,
    callEnded,
    answerCall,
    leaveCall,
    callTarget,
    callAccepted,
    type,
  } = useContext(PeerContext);
  const dispatch = useDispatch();
  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  useGetLoggedUserQuery(token, { skip: !token });
  useGetRequestsQuery(undefined, { skip: !token });

  useEffect(() => {
    async function connect() {
      const conn = new HubConnectionBuilder()
        .withUrl(`${apiUrl}/Online`, { accessTokenFactory: () => token })
        .configureLogging(LogLevel.Information)
        .build();

      // conn.invoke("Logged", {
      //   ...user,
      //   friends: user.friends.map((x) => x.userID).join(","),
      // });

      // conn.invoke("Active", {
      //   ...user,
      //   friends: user.friends.map((x) => x.userID).join(","),
      // });

      // conn.on("checkActivesToClient", (actives) => {
      //   actives.forEach((item) => {
      //     let isExist = online?.online?.includes(item);
      //     if (!isExist) {
      //       dispatch(addOnline(item));
      //     }
      //   });
      // });

      // conn.on("createPostToClient", (newPost) => {
      //   dispatch(addPost(newPost));
      // });

      await conn.start();
      dispatch(updateSocket(conn));
    }
    if (user) {
      connect();
    }
    return () => {};
  }, [user]);

  // useEffect(() => {
  //   const socket = io(`${apiUrl}`);
  //   dispatch(updateSocket(socket));
  //   return () => {
  //     socket.close();
  //   };
  // }, [dispatch]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, []);

  return !localStorage["isLogged"] ? (
    <>{(window.location.href = "/login")}</>
  ) : (
    <>
      <ScrollToTop>
        {Object.values(showModal).some((item) => item) && (
          <Wrapper>
            {showModal?.post && <PostCreateModal />}
            {showModal?.profile && (
              <EditProfile
                setShowModal={setShowModal}
                setLoading={setLoading}
              />
            )}
            {showModal?.create_group && (
              <CreateGroupChatModal
                setShowModal={setShowModal}
                setLoading={setLoading}
              />
            )}
            {showModal?.group_settings && (
              <GroupSettingsModal
                setShowModal={setShowModal}
                showModal={showModal}
              />
            )}
            {showModal?.confirm_modal && <ConfirmModal />}
          </Wrapper>
        )}

        {!call &&
          stream &&
          !callEnded &&
          (!callAccepted ? (
            <CallModal callTarget={callTarget} leaveCall={leaveCall} />
          ) : type === "audio" ? (
            <CallModal
              type="audio"
              callTarget={callTarget}
              leaveCall={leaveCall}
              callAccepted={callAccepted}
              user={user}
            />
          ) : (
            <VideoChatModal user={user} />
          ))}
        {call &&
          !callEnded &&
          (!callAccepted ? (
            <CallModal
              call={call}
              answerCall={answerCall}
              leaveCall={leaveCall}
            />
          ) : type === "audio" ? (
            <CallModal
              type="audio"
              leaveCall={leaveCall}
              call={call}
              callAccepted={callAccepted}
              user={user}
            />
          ) : (
            <VideoChatModal user={user} />
          ))}
        <Navbar />

        <Outlet />
        {!!showChatBox.length && pathname !== "/messenger" && (
          <div className="fixed flex bottom-0 right-24 gap-4 z-40">
            {showChatBox?.map((item) => {
              return <ChatBox key={item?._id} item={item} />;
            })}
          </div>
        )}
        {user && <SocketClient />}
      </ScrollToTop>
      {loading && <LoadingLayout />}
    </>
  );
};

export default ProtectedRoute;
