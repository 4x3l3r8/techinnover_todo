import Routes from "@/Routes";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "@/components";
import { authApi } from "../services/auth.api";

const initialAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout: () => {
      //   Cookies.remove(import.meta.env.VITE_AUTH_COOKIE);
      return initialAuthState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      // the token should be encrypted for security
      // the cookie key shuld be in the .env
      //   Cookies.set(import.meta.env.VITE_AUTH_COOKIE, payload.data.token);
      state.token = payload.data.token;
      state.user = payload.data.userDetails;

      Routes.navigate("/dashboard");
    });

    builder.addMatcher(authApi.endpoints.login.matchRejected, (state, { payload }) => {
      toast({
        status: "error",
        title: "Failed to login",
        description: payload.data.message,
      });
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth;
