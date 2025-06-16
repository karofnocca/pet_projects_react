import { combineReducers } from "redux";
import userDetailReducer from "./features/userDetails/userDetailsSlice";
import userListReducer from "./features/usersList/userListSlice";

const rootReducer = combineReducers({
  userData: userListReducer,
  userDetail: userDetailReducer,
});

export default rootReducer;
