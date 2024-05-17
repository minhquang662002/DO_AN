import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { profileApi } from "../services/profile.service";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.user = action.payload;
    },

    resetUserState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        profileApi.endpoints.getProfile.matchFulfilled,
        (state, action) => {
          state.user = action.payload.data.user;
        }
      )
      .addMatcher(profileApi.endpoints.updateUser.matchFulfilled, () => {
        toast.success("Updated successfuly");
      });
  },
});

export const { setInfo, resetUserState } = userSlice.actions;
export default userSlice.reducer;
