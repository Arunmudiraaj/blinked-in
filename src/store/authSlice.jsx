import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { name: "", email: "", photoUrl: "" },
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photoUrl = action.payload.photoUrl;
    },
    logout: (state) => {
      console.log("h");
      state.name = "";
      state.email = "";
      state.photoUrl = "";
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice;
