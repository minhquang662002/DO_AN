import { createSlice } from "@reduxjs/toolkit";
import { messageApi } from "../services/message.service";

const initialState = {
  groups: [],
  loading: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    // updateGroup: (state, action) => {
    //   state.groups = state.groups.map((item) => {
    //     if (item._id !== action.payload._id) {
    //       return item;
    //     } else {
    //       return action.payload;
    //     }
    //   });
    // },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        messageApi.endpoints.getGroupConversations.matchPending,
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        messageApi.endpoints.getGroupConversations.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.groups = action.payload;
        }
      );
  },
});

export const { addGroup } = messageSlice.actions;
export default messageSlice.reducer;
