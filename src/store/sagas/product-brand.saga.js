import { all, takeLatest, takeEvery, fork, call, put } from "redux-saga/effects";
import { productBrandActionTypes as types } from "../action-types";
import {
  findAllProductBrandSucceed,
  queryProductBrandSucceed
} from "../actions/product-brand.action";
import { catchReduxError, normalizeData } from "../actions/general.action";
import { productBrandArraySchema } from "../schemas";
import { findAll, query } from "../server";

async function getAllData() {
  try {
    const response = await findAll("product-brand");
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
    const response = await query("product-brand", q);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}

function* findAllSaga({ actions = {} }) {
  try {
    yield put({ type: types.PRODUCTBRAND_REQUEST_INITIATED });
    const payload = yield call(getAllData);
    const normalizedData = yield call(normalizeData, {
      data: payload,
      schema: productBrandArraySchema
    });
    yield put(findAllProductBrandSucceed({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, error);
  }
}

function* findByIdSaga({ product_brand_id, actions = {} }) {
  yield put({ type: types.PRODUCTBRAND_REQUEST_INITIATED });
}

function* querySaga({ query, actions = {} }) {
  try {
    yield put({ type: types.PRODUCTBRAND_REQUEST_INITIATED });
    const payload = yield call(queryData, query);
    const normalizedData = yield call(normalizeData, {
      data: payload,
      schema: productBrandArraySchema
    });
    yield put(queryProductBrandSucceed({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, error);
  }
}

// -------------------- watchers --------------------
function* watcherFindAll() {
  yield takeLatest(types.PRODUCTBRAND_FIND_ALL_REQUEST, findAllSaga);
}

function* watcherFindById() {
  yield takeEvery(types.PRODUCTBRAND_FIND_BY_ID_REQUEST, findByIdSaga);
}

function* watcherQuery() {
  yield takeLatest(types.PRODUCTBRAND_QUERY_REQUEST, querySaga);
}

export default function* rootProductBrandSaga() {
  yield all([fork(watcherFindAll), fork(watcherFindById), fork(watcherQuery)]);
}
