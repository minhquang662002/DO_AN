import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../utils/constants";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api/Comment`,
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
    createComment: builder.mutation({
      query: ({ postID, commentID, data }) => {
        return {
          url: `/${postID}${commentID ? `?commentID=${commentID}` : ""}`,
          method: "post",
          body: data,
        };
      },
      async onQueryStarted(_, { getState, queryFulfilled }) {
        const { socket } = getState().socket;
        const { data: newComment } = await queryFulfilled;
        socket?.invoke("CreateComment", newComment.data.comments);
      },
    }),
    getComments: builder.query({
      query: ({ id, page }) => `?postID=${id}&page=${page}`,
    }),
    getReplies: builder.query({
      query: ({ commentID, page }) => `/${commentID}?page=${page}`,
    }),
    deleteComment: builder.mutation({
      query: ({ commentID, postID }) => {
        return {
          url: `/${commentID}`,
          method: "delete",
        };
      },
    }),
    updateComment: builder.mutation({
      query: ({ data, commentID }) => {
        return {
          url: `/${commentID}`,
          method: "PUT",
          body: data,
        };
      },
    }),
    likeComment: builder.mutation({
      query: (id) => {
        return {
          url: `/like/${id}`,
          method: "PUT",
        };
      },
    }),
    unlikeComment: builder.mutation({
      query: (id) => {
        return {
          url: `/unlike/${id}`,
          method: "PUT",
        };
      },
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentsQuery,
  useGetRepliesQuery,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
