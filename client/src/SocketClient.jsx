import { useEffect } from "react";
import { addRequest } from "./redux/slices/friendRequestSlice";
import { receiveNotification } from "./redux/slices/notificationSlice";
import { addOnline, removeOnline } from "./redux/slices/onlineSlice";
import { addPost, updatePost } from "./redux/slices/postSlice";
import { updateInfo } from "./redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const SocketClient = () => {
  const { auth, socket, online } = useSelector((state) => state);
  const dispatch = useDispatch();
  const spawnNotification = (body, icon, url, title) => {
    let options = {
      body,
      icon,
    };
    let n = new Notification(title, options);
    n.onclick = (e) => {
      e.preventDefault();
      window.open(url, "_blank");
    };
  };
  useEffect(() => {
    socket?.socket?.invoke("Logged", {
      ...auth.user,
      friends: auth.user.friends.map((x) => x.userID).join(","),
    });
  }, [socket.socket, auth.user]);

  useEffect(() => {
    socket?.socket?.invoke("Active", {
      ...auth.user,
      friends: auth.user.friends.map((x) => x.userID).join(","),
    });
  }, [socket.socket, auth.user]);

  useEffect(() => {
    socket?.socket?.on("checkActivesToClient", (actives) => {
      actives.forEach((item) => {
        let isExist = online?.online?.includes(item);
        if (!isExist) {
          dispatch(addOnline(item));
        }
      });
    });
    // return () => socket.socket.stop();
  }, [socket.socket, online?.online, dispatch]);

  // useEffect(() => {
  //   socket?.socket?.on("offlineToClient", (ofl) => {
  //     dispatch(removeOnline(ofl));
  //   });
  // }, [socket.socket, dispatch]);

  useEffect(() => {
    socket?.socket?.on("createPostToClient", (newPost) => {
      dispatch(addPost(newPost));
    });
  }, [socket.socket, dispatch]);

  useEffect(() => {
    socket?.socket?.on("likePostToClient", (updateData, id) => {
      const data = {
        data: { likes: updateData?.likes?.filter((x) => x) },
        id: id,
      };
      dispatch(updatePost(data));
    });
  }, [socket.socket, dispatch]);

  useEffect(() => {
    socket?.socket?.on("unlikePostToClient", (updateData, id) => {
      const data = {
        data: { likes: updateData?.likes?.filter((x) => x) },
        id: id,
      };
      dispatch(updatePost(data));
    });
  }, [socket.socket, dispatch]);

  useEffect(() => {
    socket?.socket?.on("sendRequestToClient", (request) => {
      dispatch(addRequest([request]));
    });
  }, [socket.socket, dispatch]);

  useEffect(() => {
    socket?.socket?.on("acceptRequestToClient", (sender) => {
      dispatch(updateInfo({ friends: [...auth.user.friends, sender] }));
    });
  }, [socket.socket, auth, dispatch]);

  useEffect(() => {
    socket?.socket?.on("createNotificationToClient", (ntf) => {
      dispatch(receiveNotification(ntf));
      spawnNotification(
        `${ntf.user.firstName} ${ntf.user.lastName} ${ntf.text}`,
        ntf.user.avatar,
        ntf.url,
        "UniSocial"
      );
    });
    // return () => socket.socket.off("createNotificationToClient");
  }, [socket.socket, dispatch]);

  useEffect(() => {
    socket?.socket?.on("sendMessageToClient", (newMessage) => {
      spawnNotification(
        `${newMessage.senderInfo.firstName} ${newMessage.senderInfo.lastName}: ${newMessage?.text}`,
        newMessage.senderInfo.avatar,
        "/",
        "UniSocial"
      );
    });
  }, [socket.socket]);

  useEffect(() => {
    socket?.socket?.on("unlikeCommentToClient", (updatedPost) => {
      dispatch(updatePosts({ postID: updatedPost.postID, post: updatedPost }));
    });
  }, [socket.socket, dispatch]);

  return <></>;
};

export default SocketClient;
