import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { findAll, query, findRecord, deleteRecord } from "../server";
import { productBrandActionTypes as types } from "../action-types";
import { catchReduxError, normalizeData } from "../actions/general.action";
import { productBrandArraySchema, productBrandSchema } from "../schemas";
import { deleteProductBrandSucceed, storeProductBrand } from "../actions/product-brand.action";

async function makeRequest(type, data) {
  try {
    let response = {};
    if (type === "query") {
      response = await query("product-brand", data);
    } else if (type === "byId") {
      response = await findRecord("product-brand", data);
    } else {
      response = await findAll("product-brand");
    }
    if (response.data) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
}

async function deleteRequest(id) {
  try {
    const response = await deleteRecord("product-brand", id);
    if (response.data) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
}

function* workerFindAll({ actions = {} }) {
  try {
    const response = yield call(makeRequest);
    yield put({ type: types["PRODUCT-BRAND_RESET_DATA"] });
    const normalizedData = yield call(normalizeData, {
      data: response,
      schema: productBrandArraySchema
    });
    yield put(storeProductBrand({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, types["PRODUCT-BRAND_REQUEST_FAILED"], error);
  }
}

function* workerQuery({ query = {}, actions = {} }) {
  try {
    const response = yield call(makeRequest, "query", query);
    yield put({ type: types["PRODUCT-BRAND_RESET_DATA"] });
    const normalizedData = yield call(normalizeData, {
      data: response,
      schema: productBrandArraySchema
    });
    yield put(storeProductBrand({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, types["PRODUCT-BRAND_REQUEST_FAILED"], error);
  }
}

function* workerFindById({ product_brand_id, actions = {} }) {
  try {
    const response = yield call(makeRequest, "byId", product_brand_id);
    const normalizedData = yield call(normalizeData, {
      data: response,
      schema: productBrandSchema
    });
    yield put(storeProductBrand({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, types["PRODUCT-BRAND_REQUEST_FAILED"], error);
  }
}

function* workerDeleteRecord({ product_brand_id, actions = {} }) {
  try {
    yield call(deleteRequest, product_brand_id);
    yield put(deleteProductBrandSucceed({ product_brand_id, meta: {} }));
    if (actions.onSuccess) {
      yield call(actions.onSuccess);
    }
  } catch (error) {
    if (actions.onFailed) {
      yield call(actions.onFailed);
    }
    yield call(catchReduxError, types["PRODUCT-BRAND_REQUEST_FAILED"], error);
  }
}

// ---------------- watchers -----------------------

function* watcherFindAll() {
  yield takeLatest(types["PRODUCT-BRAND_FIND_ALL_REQUEST"], workerFindAll);
}

function* watcherQuery() {
  yield takeLatest(types["PRODUCT-BRAND_QUERY_REQUEST"], workerQuery);
}

function* watcherFindById() {
  yield takeLatest(types["PRODUCT-BRAND_FIND_BY_ID_REQUEST"], workerFindById);
}

function* watcherDeleteRecord() {
  yield takeLatest(types["PRODUCT-BRAND_DELETE_REQUEST"], workerDeleteRecord);
}

export default function* rootSaga() {
  yield all([
    fork(watcherFindAll),
    fork(watcherQuery),
    fork(watcherFindById),
    fork(watcherDeleteRecord)
  ]);
}
