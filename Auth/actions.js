import * as types from "./actionTypes";

export const loginUser = (data) => {
  return {
    type: types.LOGIN,
    payload: data,
  };
};

export const loginSuccess = (data) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: data,
  };
};

export const registerUser = (data) => {
  return {
    type: types.REGISTER_USER,
    payload: data,
  };
};

export const registerUserSuccessful = (data) => {
  return {
    type: types.REGISTER_USER_SUCCESSFUL,
    payload: data,
  };
};

export const forgotPassword = (data) => {
  return {
    type: types.FORGOT_PASSWORD,
    payload: data,
  };
};

export const resetPassword = (data) => {
  return {
    type: types.RESET_PASSWORD,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: types.LOGOUT,
  };
};