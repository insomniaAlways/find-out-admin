import { productActionTypes as types } from "../action-types";

export function createProduct({ payload, actions = {} }) {
  return {
    type: types["PRODUCT_CREATE_REQUEST"],
    payload,
    actions
  };
}

export function findAllProduct({ actions = {} }) {
  return {
    type: types["PRODUCT_FIND_ALL_REQUEST"],
    actions
  };
}

export function queryProduct({ query, actions = {} }) {
  return {
    type: types["PRODUCT_QUERY_REQUEST"],
    query,
    actions
  };
}

export function findByIdProduct({ product_id, actions = {} }) {
  return {
    type: types["PRODUCT_FIND_BY_ID_REQUEST"],
    product_id,
    actions
  };
}

export function storeProduct({ payload, meta = {} }) {
  return {
    type: types["PRODUCT_REQUEST_SUCCEED"],
    payload,
    meta
  };
}

export function deleteProduct({ product_id, actions = {} }) {
  return {
    type: types["PRODUCT_DELETE_REQUEST"],
    product_id,
    actions
  };
}

export function deleteProductSucceed({ product_id, meta = {} }) {
  return {
    type: types["PRODUCT_DELETE_SUCCEED"],
    id: product_id,
    meta
  };
}

export function updateProduct({ product_id, product_brand_unit_id, payload, actions = {} }) {
  return {
    type: types["PRODUCT_UPDATE_REQUEST"],
    product_id,
    product_brand_unit_id,
    payload,
    actions
  };
}
