import { all, takeLatest, fork, call, put } from "redux-saga/effects";
import { sessionActionTypes as types } from "../action-types";
import { createRecord } from "../server";

function* workerAuthenticate({ email, password }) {
  try {
    const response = yield call(
      createRecord,
      "token",
      { email, password },
      {
        baseURL: "https://findoutv1.herokuapp.com/admin/v1/"
      }
    );
    if (response.data.token) {
      yield put({ type: types.AUTHENTICATION_SUCCESS, payload: response.data });
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
