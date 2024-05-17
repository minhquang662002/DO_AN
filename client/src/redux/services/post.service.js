import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../utils/constants";
import { removePost, updatePost } from "../slices/postSlice";
import { toast } from "react-toastify";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api/Post`,
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
    getUserPosts: builder.query({
      query: ({ id, page }) => `/user_posts?id=${id}&page=${page}`,
    }),
    getPublicPosts: builder.query({
      query: (page) => `?page=${page}`,
    }),
    createPost: builder.mutation({
      query: (data) => {
        return {
          method: "post",
          body: data,
        };
      },
      async onQueryStarted(_, { queryFulfilled, getState }) {
        const { socket } = getState().socket;
        const { data: newPost } = await queryFulfilled;
        socket?.invoke("CreatePost", newPost.data.posts);
      },
    }),
    updatePost: builder.mutation({
      query: ({ data, id }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;
        if (res.data) {
          dispatch(updatePost(arg));
        }
      },
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "delete",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;
        if (res.data) {
          dispatch(removePost(id));
        }
      },
    }),
    likePost: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/like/${id}`,
          method: "PUT",
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        dispatch(updatePost(arg));
        const { socket } = getState().socket;
        await queryFulfilled;
        socket?.invoke("LikePost", arg.data, arg.id, arg.owner);
      },
    }),
    unlikePost: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/unlike/${id}`,
          method: "PUT",
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        dispatch(updatePost(arg));
        const { socket } = getState().socket;
        await queryFulfilled;
        socket?.invoke("UnlikePost", arg.data, arg.id, arg.owner);
      },
    }),
    savePost: builder.mutation({
      query: (postID) => {
        return {
          url: `posts/save/${postID}`,
          method: "PATCH",
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success(data);
        } catch (error) {
          toast.error("Error");
        }
      },
    }),
    unsavePost: builder.mutation({
      query: (postID) => {
        return {
          url: `posts/unsave/${postID}`,
          method: "PATCH",
        };
      },
      onQueryStarted(postID, { dispatch }) {
        dispatch(removePost(postID));
      },
    }),
    getSavedPost: builder.query({
      query: () => "posts/save",
    }),
  }),
});

export const {
  useGetPublicPostsQuery,
  useGetUserPostsQuery,
  useGetSavedPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useSavePostMutation,
  useUnsavePostMutation,
} = postApi;
