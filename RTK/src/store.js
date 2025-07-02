import { configureStore } from "@reduxjs/toolkit";
import userListSlice from "./features/usersList/userListSlice";

const store = configureStore({
  reducer: {
    userList: userListSlice,
  },
});

export default store;
