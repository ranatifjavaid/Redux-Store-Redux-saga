import axios from "../../Routes/AxiosConfig";
import { fork, put, all, takeLatest } from "redux-saga/effects";
// Login Redux States
import {
  LOGIN,
  REGISTER_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from "./actionTypes";
import { loginSuccess } from "./actions";
import { push } from "connected-react-router";
import { sagaErrorHandler } from "../../Shared/HelperMethods/SagaErrorHandler";
import { toast } from "react-toastify";

// Login Saga funtion
function* loginUserRequest({ payload }) {
  const { email, password, resetForm } = payload;
  try {
    let data = {
      email: email,
      password: password,
    };
    const response = yield axios.post("auth/login", data);
    toast.success(response.data.message);
    yield put(loginSuccess(response.data.data));
    resetForm();
    yield put(push("/"));
  } catch (error) {
    yield sagaErrorHandler(error.response.data);
  }
}

// Register Saga funtion
function* registerUserRequest({ payload }) {
  try {
    let data = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
      profilePictureURL: null,
      academyName: payload.organizationName,
      industry: payload.industry,
      phone: payload.phoneNo,
      childPlanId: payload.childPlanId,
      companyId: payload.companyId,
      source: payload.token,
      last4: payload.last4,
      brand: payload.brand,
    };
    payload.setDisableButton(true);
    const response = yield axios.post("auth/signup", data);
    yield put(loginSuccess(response.data.data));
    yield put(push("/"));
    payload.resetForm();
  } catch (error) {
    yield sagaErrorHandler(error.response.data);
  }
}

// Forgot Saga funtion
function* forgotPasswordRequest({ payload }) {
  try {
    let data = {
      email: payload.email,
    };
    const response = yield axios.post("auth/admin/forgot-password", data);
    toast.info(response.data.message);
  } catch (error) {
    yield sagaErrorHandler(error.response.data);
  }
}

// Reset Saga funtion
function* resetPasswordRequest({ payload }) {
  try {
    let data = {
      password: payload.password,
    };
    const response = yield axios.post("user/forgotPassword", data);
    toast.info(response.data.message);
    yield put(push("/login"));
  } catch (error) {
    yield sagaErrorHandler(error.response.data);
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN, loginUserRequest);
}
export function* watchRegister() {
  yield takeLatest(REGISTER_USER, registerUserRequest);
}
export function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD, resetPasswordRequest);
}
export function* watchForgotPassword() {
  yield takeLatest(FORGOT_PASSWORD, forgotPasswordRequest);
}

export default function* authSaga() {
  yield all([
    fork(watchLogin),
    fork(watchRegister),
    fork(watchResetPassword),
    fork(watchForgotPassword),
  ]);
}
