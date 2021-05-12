import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { createRecord, findAll, query, deleteRecord, findRecord, updateRecord } from "../server";
import { productActionTypes as types } from "../action-types";
import { catchReduxError, normalizeData } from "../actions/general.action";
import { productBrandUnitSchema, productArraySchema, productSchema } from "../schemas";
import { deleteProductSucceed, storeProduct } from "../actions/product.action";
import { queryProductBrandUnit, storeProductBrandUnit } from "../actions/product-brand-unit.action";
import { queryProductBrand } from "../actions/product-brand.action";

async function makeRequest(type, data) {
  try {
    let response = {};
    if (type === "query") {
      response = await query("product", data);
    } else if (type === "byId") {
      response = await findRecord("product", data);
    } else {
      response = await findAll("product");
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

async function createRequest(payload) {
  try {
    const response = await createRecord("add-product", payload);
    if (response.data) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
}

async function updateRequest(id, payload) {
  try {
    const response = await updateRecord("product", id, payload);
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
    const response = await deleteRecord("product", id);
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
    const normalizedData = yield call(normalizeData, {
      data: response,
      schema: productArraySchema
    });
    yield put(storeProduct({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, types["PRODUCT_REQUEST_FAILED"], error);
  }
}

function* workerQuery({ query = {}, actions = {} }) {
  try {
    const response = yield call(makeRequest, "query", query);
    const normalizedData = yield call(normalizeData, {
      data: response,
      schema: productArraySchema
    });
    yield put(storeProduct({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, types["PRODUCT_REQUEST_FAILED"], error);
  }
}

function* workerFindById({ product_id, actions = {} }) {
  try {
    const response = yield call(makeRequest, "byId", product_id);
    const normalizedData = yield call(normalizeData, {
      data: response,
      schema: productSchema
    });
    yield put(storeProduct({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, types["PRODUCT_REQUEST_FAILED"], error);
  }
}

function* workerCreateRecord({ payload = {}, actions = {} }) {
  try {
    yield call(createRequest, payload);
    if (payload && payload.product_id) {
      yield put(queryProductBrand({ query: { product_id: payload.product_id }, actions: {} }));
    }
    if (payload && payload.product_brand_id) {
      yield put(
        queryProductBrandUnit({
          query: { product_brand_id: payload.product_brand_id },
          actions: {}
        })
      );
    }
    if (actions && actions.onSuccess) {
      actions.onSuccess();
    }
  } catch (error) {
    yield call(catchReduxError, types["PRODUCT_REQUEST_FAILED"], error);
    if (actions && actions.onFailed) {
      actions.onFailed();
    }
  }
}

function* workerUpdatedRecord({ product_id, product_brand_unit_id, payload, actions = {} }) {
  try {
    yield call(updateRequest, product_id, payload);
    const normalizedData = yield call(normalizeData, {
      data: {
        id: product_brand_unit_id,
        ...payload
      },
      schema: productBrandUnitSchema
    });
    yield put(storeProductBrandUnit({ payload: normalizedData, meta: {} }));
    if (actions && actions.onSuccess) {
      actions.onSuccess();
    }
  } catch (error) {
    yield call(catchReduxError, types["PRODUCT_REQUEST_FAILED"], error);
    if (actions && actions.onFailed) {
      actions.onFailed();
    }
  }
}

function* workerDeleteRecord({ product_id, actions = {} }) {
  try {
    yield call(deleteRequest, product_id);
    yield put(deleteProductSucceed({ product_id, meta: {} }));
    if (actions.onSuccess) {
      yield call(actions.onSuccess);
    }
  } catch (error) {
    if (actions.onFailed) {
      yield call(actions.onFailed);
    }
    yield call(catchReduxError, types["PRODUCT_REQUEST_FAILED"], error);
  }
}

// ---------------- watchers -----------------------

function* watcherFindAll() {
  yield takeLatest(types["PRODUCT_FIND_ALL_REQUEST"], workerFindAll);
}

function* watcherQuery() {
  yield takeLatest(types["PRODUCT_QUERY_REQUEST"], workerQuery);
}

function* watcherFindById() {
  yield takeLatest(types["PRODUCT_FIND_BY_ID_REQUEST"], workerFindById);
}

function* watcherCreateRecord() {
  yield takeLatest(types["PRODUCT_CREATE_REQUEST"], workerCreateRecord);
}

function* watcherUpdatedRecord() {
  yield takeLatest(types["PRODUCT_UPDATE_REQUEST"], workerUpdatedRecord);
}

function* watcherDeleteRecord() {
  yield takeLatest(types["PRODUCT_DELETE_REQUEST"], workerDeleteRecord);
}

export default function* rootSaga() {
  yield all([
    fork(watcherFindAll),
    fork(watcherQuery),
    fork(watcherFindById),
    fork(watcherCreateRecord),
    fork(watcherDeleteRecord),
    fork(watcherUpdatedRecord)
  ]);
}
