import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    email: "",
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.email = action.payload.email;
    },
    logout(state, action) {
      state.isAuthenticated = false;
      state.email = "";
    },
    signup(state, action) {
      state.isAuthenticated = true;
      state.email = action.payload.email;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
