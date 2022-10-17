import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./features/userInfo";
import storyInfoReducer from "./features/storyInfo";

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    storyInfo: storyInfoReducer
  },
});

export default store;
