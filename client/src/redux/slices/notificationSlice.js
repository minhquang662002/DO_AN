import { createSlice } from "@reduxjs/toolkit";
import { notificationApi } from "../services/notification.service";

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    readNotification: (state, action) => {
      state.notifications = state.notifications.map((item) => {
        if (item.notificationID === action.payload.id) {
          return { ...item, readBy: [...item.readBy, action.payload.user] };
        } else {
          return item;
        }
      });
    },
    readAllNotifications: (state, action) => {
      state.notifications = state.notifications.map((item) => ({
        ...item,
        readBy: [...item.readBy, action.payload],
      }));
    },
    removeAllNotifications: (state) => {
      state.notifications = [];
    },
    receiveNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      notificationApi.endpoints.getNotifications.matchFulfilled,
      (state, action) => {
        state.notifications = action.payload.data;
      }
    );
  },
});

export const {
  receiveNotification,
  readNotification,
  readAllNotifications,
  removeAllNotifications,
} = notificationSlice.actions;
export default notificationSlice.reducer;
