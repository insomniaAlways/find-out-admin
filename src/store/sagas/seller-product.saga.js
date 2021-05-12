import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { createRecord, findAll, query, deleteRecord, findRecord, updateRecord } from "../server";
import { sellerProductActionTypes as types } from "../action-types";
import { catchReduxError, normalizeData } from "../actions/general.action";
import { productBrandUnitSchema, sellerProductArraySchema, sellerProductSchema } from "../schemas";
import { deleteSellerProductSucceed, storeSellerProduct } from "../actions/seller-product.action";
import { queryProductBrandUnit, storeProductBrandUnit } from "../actions/product-brand-unit.action";
import { queryProductBrand } from "../actions/product-brand.action";

async function makeRequest(type, data) {
  try {
    let response = {};
    if (type === "query") {
      response = await query("seller-product", data);
    } else if (type === "byId") {
      response = await findRecord("seller-product", data);
    } else {
      response = await findAll("seller-product");
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
    const response = await updateRecord("seller-product", id, payload);
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
    const response = await deleteRecord("seller-product", id);
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
      schema: sellerProductArraySchema
    });
    yield put(storeSellerProduct({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, types["SELLER-PRODUCT_FAILED"], error);
  }
}

function* workerQuery({ query = {}, actions = {} }) {
  try {
    const response = yield call(makeRequest, "query", query);
    const normalizedData = yield call(normalizeData, {
      data: response,
      schema: sellerProductArraySchema
    });
    yield put(storeSellerProduct({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, types["SELLER-PRODUCT_FAILED"], error);
  }
}

function* workerFindById({ seller_product_id, actions = {} }) {
  try {
    const response = yield call(makeRequest, "byId", seller_product_id);
    const normalizedData = yield call(normalizeData, {
      data: response,
      schema: sellerProductSchema
    });
    yield put(storeSellerProduct({ payload: normalizedData, meta: {} }));
  } catch (error) {
    yield call(catchReduxError, types["SELLER-PRODUCT_FAILED"], error);
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
    yield call(catchReduxError, types["SELLER-PRODUCT_FAILED"], error);
    if (actions && actions.onFailed) {
      actions.onFailed();
    }
  }
}

function* workerUpdatedRecord({ seller_product_id, payload, actions = {} }) {
  try {
    yield call(updateRequest, seller_product_id, payload);
    const normalizedData = yield call(normalizeData, {
      data: {
        id: seller_product_id,
        ...payload
      },
      schema: productBrandUnitSchema
    });
    yield put(storeProductBrandUnit({ payload: normalizedData, meta: {} }));
    if (actions && actions.onSuccess) {
      actions.onSuccess();
    }
  } catch (error) {
    yield call(catchReduxError, types["SELLER-PRODUCT_FAILED"], error);
    if (actions && actions.onFailed) {
      actions.onFailed();
    }
  }
}

function* workerDeleteRecord({ seller_product_id, actions = {} }) {
  try {
    yield call(deleteRequest, seller_product_id);
    yield put(deleteSellerProductSucceed({ seller_product_id, meta: {} }));
    if (actions.onSuccess) {
      yield call(actions.onSuccess);
    }
  } catch (error) {
    if (actions.onFailed) {
      yield call(actions.onFailed);
    }
    yield call(catchReduxError, types["SELLER-PRODUCT_FAILED"], error);
  }
}

// ---------------- watchers -----------------------

function* watcherFindAll() {
  yield takeLatest(types["SELLER-PRODUCT_FIND_ALL_REQUEST"], workerFindAll);
}

function* watcherQuery() {
  yield takeLatest(types["SELLER-PRODUCT_QUERY_REQUEST"], workerQuery);
}

function* watcherFindById() {
  yield takeLatest(types["SELLER-PRODUCT_FIND_BY_ID_REQUEST"], workerFindById);
}

function* watcherCreateRecord() {
  yield takeLatest(types["SELLER-PRODUCT_CREATE_REQUEST"], workerCreateRecord);
}

function* watcherUpdatedRecord() {
  yield takeLatest(types["SELLER-PRODUCT_UPDATE_REQUEST"], workerUpdatedRecord);
}

function* watcherDeleteRecord() {
  yield takeLatest(types["SELLER-PRODUCT_DELETE_REQUEST"], workerDeleteRecord);
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
