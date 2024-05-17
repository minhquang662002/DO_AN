import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  online: [],
  loading: false,
};

const messageSlice = createSlice({
  name: "online",
  initialState,
  reducers: {
    addOnline: (state, action) => {
      state.online.unshift(action.payload);
    },
    removeOnline: (state, action) => {
      state.online = state.online.filter((item) => item !== action.payload);
    },
  },
});

export const { addOnline, removeOnline } = messageSlice.actions;
export default messageSlice.reducer;
