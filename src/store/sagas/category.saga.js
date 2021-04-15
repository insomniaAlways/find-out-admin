import { all, takeLatest, takeEvery, fork, call, put } from "redux-saga/effects";
import { categoryActionTypes as types } from "../action-types";
import { findAllCategorySucceed } from "../actions/category.action";
import { catchReduxError, normalizeData } from "../actions/general.action";
import { categoryArraySchema } from "../schemas";
import { findAll } from "../server";

async function getAllData() {
  debugger;
  try {
    const response = await findAll("category");
    if (response.data) {
      debugger;
      return response.data;
    }
    return response;
  } catch (error) {
    throw error;
  }
}

function* findAllSaga({ actions = {} }) {
  debugger;
  try {
    yield put({ type: types.CATEGORY_REQUEST_INITIATED });
    const payload = yield call(getAllData);
    debugger;
    const normalizedData = yield call(normalizeData, {
      data: payload,
      schema: categoryArraySchema
    });
    yield put(findAllCategorySucceed({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, error);
  }
}

function* findByIdSaga({ category_id, actions = {} }) {
  yield put({ type: types.CATEGORY_REQUEST_INITIATED });
}

function* querySaga({ query, actions = {} }) {
  yield put({ type: types.CATEGORY_REQUEST_INITIATED });
}

// -------------------- watchers --------------------
function* watcherFindAll() {
  // debugger;
  yield takeLatest(types.CATEGORY_FIND_ALL_REQUEST, findAllSaga);
}

function* watcherFindById() {
  yield takeEvery(types.CATEGORY_FIND_BY_ID_REQUEST, findByIdSaga);
}

function* watcherQuery() {
  yield takeLatest(types.CATEGORY_QUERY_REQUEST, querySaga);
}

export default function* rootCategorySaga() {
  yield all([fork(watcherFindAll), fork(watcherFindById), fork(watcherQuery)]);
}
