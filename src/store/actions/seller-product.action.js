import { sellerProductActionTypes as types } from "../action-types";

export function createSellerProduct({ payload, actions = {} }) {
  return {
    type: types["SELLER-PRODUCT_CREATE_REQUEST"],
    payload,
    actions
  };
}

export function findAllSellerProduct({ actions = {} }) {
  return {
    type: types["SELLER-PRODUCT_FIND_ALL_REQUEST"],
    actions
  };
}

export function querySellerProduct({ query, actions = {} }) {
  return {
    type: types["SELLER-PRODUCT_QUERY_REQUEST"],
    query,
    actions
  };
}

export function findByIdSellerProduct({ seller_product_id, actions = {} }) {
  return {
    type: types["SELLER-PRODUCT_FIND_BY_ID_REQUEST"],
    seller_product_id,
    actions
  };
}

export function storeSellerProduct({ payload, meta = {} }) {
  return {
    type: types["SELLER-PRODUCT_SUCCEED"],
    payload,
    meta
  };
}

export function deleteSellerProduct({ seller_product_id, actions = {} }) {
  return {
    type: types["SELLER-PRODUCT_DELETE_REQUEST"],
    seller_product_id,
    actions
  };
}

export function deleteSellerProductSucceed({ seller_product_id, meta = {} }) {
  return {
    type: types["SELLER-PRODUCT_DELETE_SUCCEED"],
    id: seller_product_id,
    meta
  };
}
