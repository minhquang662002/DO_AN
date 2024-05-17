import { friendRequestApi } from "../services/friendRequest.service";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
};

const friendRequestSlice = createSlice({
  name: "friendRequest",
  initialState,
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    addRequest: (state, action) => {
      state.requests.unshift(...action.payload);
    },
    removeRequest: (state, action) => {
      state.requests = state.requests.filter(
        (item) => item.friendRequestID !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      friendRequestApi.endpoints.getRequests.matchFulfilled,
      (state, action) => {
        state.requests = action.payload.data.requests;
      }
    );
  },
});

export const { setRequests, addRequest, removeRequest } =
  friendRequestSlice.actions;
export default friendRequestSlice.reducer;
