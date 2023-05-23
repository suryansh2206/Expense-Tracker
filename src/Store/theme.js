import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isActivated: false,
    bgColor: false,
  },
  reducers: {
    activateTheme(state, action) {
      state.isActivated = !state.isActivated;
    },
    changeTheme(state, action) {
      state.bgColor = !state.bgColor;
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice;
