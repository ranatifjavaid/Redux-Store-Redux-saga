import produce from "immer";
import * as types from "./actionTypes";

const initialState = {
  user: null,
  token: null,
};

const Auth = produce((state, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      state.user = action.payload.user;
      state.token = action.payload.token;
      break;
    case types.REGISTER_USER_SUCCESSFUL:
      state.user = action.payload.user;
      state.token = action.payload.token;
      break;
    case types.LOGOUT:
      state.user = null;
      state.token = null;
      break;
    default:
      break;
  }
}, initialState);

export default Auth;
