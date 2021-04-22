import { all, takeLatest, takeEvery, fork, call, put } from "redux-saga/effects";
import { productActionTypes as types } from "../action-types";
import {
  findAllProductSucceed,
  queryProductSucceed,
  findByIdProductSucceed
} from "../actions/product.action";
import { catchReduxError, normalizeData } from "../actions/general.action";
import { productArraySchema } from "../schemas";
import { findAll, query, findRecord } from "../server";

async function getAllData() {
  try {
    const response = await findAll("product");
    if (response.data) {
      return response.data;
    }
    return response;
  } catch (error) {
    throw error;
  }
}
async function idData(id) {
  try {
    const response = await findRecord("product", id);
    if (response.data) {
      return response.data;
    }
    return response;
  } catch (error) {
    throw error;
  }
}
async function queryData(q) {
  try {
    const response = await query("product", q);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}

function* findAllSaga({ actions = {} }) {
  try {
    yield put({ type: types.PRODUCT_REQUEST_INITIATED });
    const payload = yield call(getAllData);
    const normalizedData = yield call(normalizeData, {
      data: payload,
      schema: productArraySchema
    });
    yield put(findAllProductSucceed({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, error);
  }
}

function* findByIdSaga({ product_id, actions = {} }) {
  try {
    yield put({ type: types.PRODUCT_REQUEST_INITIATED });
    const payload = yield call(idData, product_id);
    const normalizedData = yield call(normalizeData, {
      data: payload,
      schema: productArraySchema
    });
    yield put(findByIdProductSucceed({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, error);
  }
}

function* querySaga({ query, actions = {} }) {
  try {
    yield put({ type: types.PRODUCT_REQUEST_INITIATED });
    const payload = yield call(queryData, query);
    const normalizedData = yield call(normalizeData, {
      data: payload,
      schema: productArraySchema
    });
    yield put(queryProductSucceed({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, error);
  }
}

// -------------------- watchers --------------------
function* watcherFindAll() {
  yield takeLatest(types.PRODUCT_FIND_ALL_REQUEST, findAllSaga);
}

function* watcherFindById() {
  yield takeEvery(types.PRODUCT_FIND_BY_ID_REQUEST, findByIdSaga);
}

function* watcherQuery() {
  yield takeLatest(types.PRODUCT_QUERY_REQUEST, querySaga);
}

export default function* rootProductSaga() {
  yield all([fork(watcherFindAll), fork(watcherFindById), fork(watcherQuery)]);
}
