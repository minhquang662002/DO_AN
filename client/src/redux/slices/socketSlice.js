import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    updateSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});
export const { updateSocket } = socketSlice.actions;
export default socketSlice.reducer;
