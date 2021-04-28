import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { findAll, query, deleteRecord, findRecord } from "../server";
import { productBrandUnitActionTypes as types } from "../action-types";
import { catchReduxError, normalizeData } from "../actions/general.action";
import { productBrandUnitArraySchema, productBrandUnitSchema } from "../schemas";
import {
  deleteProductBrandUnitSucceed,
  storeProductBrandUnit
} from "../actions/product-brand-unit.action";

async function makeRequest(type, data) {
  try {
    let response = {};
    if (type === "query") {
      response = await query("product-brand-unit", data);
    } else if (type === "byId") {
      response = await findRecord("product-brand-unit", data);
    } else {
      response = await findAll("product-brand-unit");
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
    const response = await deleteRecord("product-brand-unit", id);
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
    yield put({ type: types["PRODUCT-BRAND-UNIT_RESET_DATA"] });
    const normalizedData = yield call(normalizeData, {
      data: response,
      schema: productBrandUnitArraySchema
    });
    yield put(storeProductBrandUnit({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, types["PRODUCT-BRAND-UNIT_REQUEST_FAILED"], error);
  }
}

function* workerQuery({ query = {}, actions = {} }) {
  try {
    const response = yield call(makeRequest, "query", query);
    yield put({ type: types["PRODUCT-BRAND-UNIT_RESET_DATA"] });
    const normalizedData = yield call(normalizeData, {
      data: response,
      schema: productBrandUnitArraySchema
    });
    yield put(storeProductBrandUnit({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, types["PRODUCT-BRAND-UNIT_REQUEST_FAILED"], error);
  }
}

function* workerFindById({ product_brand_unit_id, actions = {} }) {
  try {
    const response = yield call(makeRequest, "byId", product_brand_unit_id);
    yield put({ type: types["PRODUCT-BRAND-UNIT_RESET_DATA"] });
    const normalizedData = yield call(normalizeData, {
      data: response,
      schema: productBrandUnitSchema
    });
    yield put(storeProductBrandUnit({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, types["PRODUCT-BRAND-UNIT_REQUEST_FAILED"], error);
  }
}

function* workerDeleteRecord({ product_brand_unit_id, actions = {} }) {
  try {
    yield call(deleteRequest, product_brand_unit_id);
    yield put(deleteProductBrandUnitSucceed({ product_brand_unit_id, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, types["PRODUCT-BRAND-UNIT_REQUEST_FAILED"], error);
  }
}

// ---------------- watchers -----------------------

function* watcherFindAll() {
  yield takeLatest(types["PRODUCT-BRAND-UNIT_FIND_ALL_REQUEST"], workerFindAll);
}

function* watcherQuery() {
  yield takeLatest(types["PRODUCT-BRAND-UNIT_QUERY_REQUEST"], workerQuery);
}

function* watcherFindById() {
  yield takeLatest(types["PRODUCT-BRAND-UNIT_FIND_BY_ID_REQUEST"], workerFindById);
}

function* watcherDeleteRecord() {
  yield takeLatest(types["PRODUCT-BRAND-UNIT_DELETE_REQUEST"], workerDeleteRecord);
}

export default function* rootSaga() {
  yield all([
    fork(watcherFindAll),
    fork(watcherQuery),
    fork(watcherFindById),
    fork(watcherDeleteRecord)
  ]);
}
