import { configureStore } from "@reduxjs/toolkit";
import authSliceReducers from "./auth/authSlice";
import goalSliceReducers from "./goals/goalSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducers,
    goals: goalSliceReducers,
  },
});
