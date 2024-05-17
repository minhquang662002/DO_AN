import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { postApi } from "../services/post.service";

const initialState = {
  posts: [],
  total: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter(
        (item) => item.postID !== action.payload
      );
    },
    updatePost: (state, action) => {
      state.posts.forEach((item, index) => {
        if (item.postID === action.payload.id) {
          return (state.posts[index] = { ...item, ...action.payload.data });
        }
      });
    },

    resetPostState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        postApi.endpoints.createPost.matchFulfilled,
        (state, action) => {
          state.posts.unshift(action.payload.data.posts);
          toast.success(action.payload.message);
        }
      )
      .addMatcher(postApi.endpoints.getUserPosts.matchRejected, (_, action) => {
        toast.error((action.payload?.data).message);
      })
      .addMatcher(
        postApi.endpoints.getUserPosts.matchFulfilled,
        (state, action) => {
          if (action.payload) {
            state.posts.push(...action.payload.data.posts);
            state.total = action.payload.data.totalCount;
          }
        }
      )

      .addMatcher(
        postApi.endpoints.getPublicPosts.matchFulfilled,
        (state, action) => {
          if (action.payload) {
            state.posts.push(...action.payload.data.posts);
            state.total = action.payload.data.totalCount;
          }
        }
      )
      .addMatcher(postApi.endpoints.updatePost.matchFulfilled, (_, action) => {
        toast.success(action.payload);
      })
      .addMatcher(
        postApi.endpoints.getSavedPost.matchFulfilled,
        (state, action) => {
          if (action.payload) {
            state.posts.push(...action.payload.posts);
            state.total = null;
          }
        }
      );
  },
});
export const { addPost, removePost, updatePost, resetPostState } =
  postSlice.actions;
export default postSlice.reducer;
