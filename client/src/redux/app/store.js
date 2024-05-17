import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import userSlice from "../slices/userSlice";
import postSlice from "../slices/postSlice";
import friendRequestSlice from "../slices/friendRequestSlice";
import messageSlice from "../slices/messageSlice";
import onlineSlice from "../slices/onlineSlice";
import socketSlice from "../slices/socketSlice";
import notificationSlice from "../slices/notificationSlice";
import { authApi } from "../services/auth.service";
import { profileApi } from "../services/profile.service";
import { postApi } from "../services/post.service";
import { commentApi } from "../services/comment.service";
import { friendRequestApi } from "../services/friendRequest.service";
import { newsApi } from "../services/news.service";
import { messageApi } from "../services/message.service";
import { weatherApi } from "../services/weather.service";
import { notificationApi } from "../services/notification.service";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    post: postSlice,
    friendRequest: friendRequestSlice,
    message: messageSlice,
    online: onlineSlice,
    socket: socketSlice,
    notification: notificationSlice,
    [profileApi.reducerPath]: profileApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [friendRequestApi.reducerPath]: friendRequestApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      profileApi.middleware,
      authApi.middleware,
      postApi.middleware,
      commentApi.middleware,
      friendRequestApi.middleware,
      newsApi.middleware,
      messageApi.middleware,
      weatherApi.middleware,
      notificationApi.middleware
    ),
  devTools: false,
});
