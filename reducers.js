import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Auth from "./Auth/reducer";

// const authPersistConfig = {
//   key: "auth",
//   storage: storage,
//   keyPrefix: "redux-",
//   whitelist: ["auth"],
// };

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    Auth,
  });

export default rootReducer;
