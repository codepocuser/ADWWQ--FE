import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: {
      isLoggedIn: false,
      token: "",
    },
  },
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.value.token = "";
      state.value.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
