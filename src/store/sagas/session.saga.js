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
  // debugger;
  try {
    // debugger;
    const response = yield call(createRecord, "login", { phone: email, otp: password });
    debugger;
    if (response.data.token) {
      yield put({ type: types.AUTHENTICATION_SUCCESS, payload: response.data });
    } else {
      let error = "User not found";
      yield put({ type: types.AUTHENTICATION_REQUEST_FAILED, error: error });
      alert(error);
    }
    // return response;
  } catch (error) {
    yield put({ type: types.AUTHENTICATION_REQUEST_FAILED, error });
  } //finally {
  //   if (yield cancelled()) {
  //     // ... put special cancellation handling code here
  //   }
  //}
}

function* workerUnAuthenticate() {
  // debugger;
  try {
    // debugger;
    // const response = yield call(createRecord, "login", { phone: email, otp: password });

    yield put({ type: types.UNAUTHENTICATE_SUCCESS });
  } catch (error) {
    yield put({ type: types.AUTHENTICATION_REQUEST_FAILED, error });
  }
}

// -------------------- watchers --------------------
function* watcherAuthenticate() {
  // debugger;
  // while (true) {
  //   debugger;
  //   const { email, password } = yield take(types.AUTHENTICATION_REQUEST_INITIATED);
  //   // fork return a Task object
  //   debugger;
  //   const task = yield fork(workerAuthenticate, email, password);
  //   debugger;
  //   const action = yield take([
  //     types.UNAUTHENTICATE_REQUEST_INITIATED,
  //     types.AUTHENTICATION_REQUEST_FAILED
  //   ]);
  //   debugger;
  //   // if (action.type === types.AUTHENTICATION_REQUEST_FAILED) {
  //   //   debugger;
  //   //   yield cancel(task);
  //   //   yield put(unAuthenticate());
  //   // }
  //   if (action.type === types.UNAUTHENTICATE_REQUEST_INITIATED) {
  //     debugger;
  //     yield cancel(task);
  //     yield put(unAuthenticate());
  //   }
  //   // yield call(Api.clearItem, 'token')
  // }
  yield takeLatest(types.AUTHENTICATION_REQUEST_INITIATED, workerAuthenticate);
}

function* watcherUnAuthenticate() {
  // debugger;
  yield takeLatest(types.UNAUTHENTICATE_REQUEST_INITIATED, workerUnAuthenticate);
}

export default function* rootSessionSaga() {
  yield all([fork(watcherAuthenticate), fork(watcherUnAuthenticate)]);
}
