import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import userListReducer from "./features/usersList/userListSlice";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
