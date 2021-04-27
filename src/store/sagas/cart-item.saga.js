import { all, fork, put, takeLatest } from "redux-saga/effects";
import { cartItemActionTypes as types } from "../action-types";

function* querySaga({ query, actions = {} }) {
  yield put({ type: types.CARTITEM_REQUEST_INITIATED });
}

function* createSaga({ payload, actions = {} }) {
  yield put({ type: types.CARTITEM_REQUEST_INITIATED });
}

function* updateSaga({ cart_item_id, payload, actions = {} }) {
  yield put({ type: types.CARTITEM_REQUEST_INITIATED });
}

function* deleteSaga({ cart_item_id, actions = {} }) {
  yield put({ type: types.CARTITEM_REQUEST_INITIATED });
}

// ------------------ Watchers ----------------------

function* watcherQuery() {
  yield takeLatest(types.CARTITEM_QUERY_REQUEST, querySaga);
}

function* watcherCreate() {
  yield takeLatest(types.CARTITEM_CREATE_REQUEST, createSaga);
}

function* watcherUpdate() {
  yield takeLatest(types.CARTITEM_UPDATE_REQUEST, updateSaga);
}

function* watcherDelete() {
  yield takeLatest(types.CARTITEM_DELETE_REQUEST, deleteSaga);
}

export default function* rootCartItemSaga() {
  yield all([fork(watcherCreate), fork(watcherQuery), fork(watcherUpdate), fork(watcherDelete)]);
}
