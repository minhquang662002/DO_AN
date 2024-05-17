import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../utils/constants";
import {
  readAllNotifications,
  readNotification,
  removeAllNotifications,
} from "../slices/notificationSlice";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: ({ amount, type }) => {
        return {
          url: `/notification?fetch=${amount}${type ? "&type=unread" : ""}`,
        };
      },
    }),

    createNotification: builder.mutation({
      query: (ntf) => {
        return {
          url: "/notification",
          method: "post",
          body: {
            ...ntf,
          },
        };
      },
      async onQueryStarted(_, { queryFulfilled, getState }) {
        const { socket } = getState().socket;
        const { data } = await queryFulfilled;
        socket?.invoke("createNotification", data);
      },
    }),

    readNotification: builder.mutation({
      query: (ntfID) => {
        return {
          url: `/notification/${ntfID}`,
          method: "PATCH",
        };
      },
      onQueryStarted: (ntfID, { dispatch, getState }) => {
        const { user } = getState().auth;
        dispatch(readNotification({ id: ntfID, user: user?._id }));
      },
    }),

    readAllNotifications: builder.mutation({
      query: () => {
        return {
          url: "/notification",
          method: "PUT",
        };
      },
      onQueryStarted(_, { dispatch, getState }) {
        const { user } = getState().auth;
        dispatch(readAllNotifications(user?._id));
      },
    }),
    deleteAllNotifications: builder.mutation({
      query: () => {
        return {
          url: "/notifications/delete",
          method: "PUT",
        };
      },
      onQueryStarted(_, { dispatch }) {
        dispatch(removeAllNotifications());
      },
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useCreateNotificationMutation,
  useReadNotificationMutation,
  useReadAllNotificationsMutation,
  useDeleteAllNotificationsMutation,
} = notificationApi;
