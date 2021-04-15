import {
  all,
  takeLatest,
  takeEvery,
  take,
  cancel,
  fork,
  call,
  put,
  cancelled
} from "redux-saga/effects";
import { sessionActionTypes as types } from "../action-types";
import { unAuthenticate } from "../actions/session.action";
import { createRecord } from "../server";

function* workerAuthenticate({ email, password }) {
  try {
    const response = yield call(createRecord, "login", { phone: email, otp: password });
    debugger;
    if (response.data.token) {
      yield put({ type: types.AUTHENTICATION_SUCCESS, payload: response.data });
      debugger;
      let tokenData = {
        expiresIn: response.data.expiresIn,
        refreshToken: response.data.refresh_token,
        token: response.data.token
      };
      localStorage.setItem("find-out-session", JSON.stringify(tokenData));
    } else {
      let error = "User not found";
      yield put({ type: types.AUTHENTICATION_REQUEST_FAILED, error: error });
      alert(error);
    }
  } catch (error) {
    yield put({ type: types.AUTHENTICATION_REQUEST_FAILED, error });
  }
}

function* workerUnAuthenticate() {
  try {
    debugger;

    localStorage.removeItem("find-out-session");
    yield put({ type: types.UNAUTHENTICATE_SUCCESS });
  } catch (error) {
    yield put({ type: types.AUTHENTICATION_REQUEST_FAILED, error });
  }
}

// -------------------- watchers --------------------
function* watcherAuthenticate() {
  yield takeLatest(types.AUTHENTICATION_REQUEST_INITIATED, workerAuthenticate);
}

function* watcherUnAuthenticate() {
  yield takeLatest(types.UNAUTHENTICATE_REQUEST_INITIATED, workerUnAuthenticate);
}

export default function* rootSessionSaga() {
  yield all([fork(watcherAuthenticate), fork(watcherUnAuthenticate)]);
}
