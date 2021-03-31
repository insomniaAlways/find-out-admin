import { productActionTypes as types } from "../action-types";

export const findByIdProduct = ({ product_id, actions = {} }) => {
  return {
    type: types.PRODUCT_FIND_BY_ID_REQUEST,
    product_id,
    actions
  };
};

export const queryProduct = ({ query, actions = {} }) => {
  return {
    type: types.PRODUCT_QUERY_REQUEST,
    query,
    actions
  };
};

export const findAllProduct = ({ actions = {} }) => {
  return {
    type: types.PRODUCT_FIND_ALL_REQUEST,
    actions
  };
};

export const findByIdProductFailed = ({ payload }) => {
  return {
    type: types.PRODUCT_FIND_BY_ID_REQUEST_FAILED,
    error: payload
  };
};

export const queryProductFailed = ({ payload }) => {
  return {
    type: types.PRODUCT_QUERY_REQUEST_FAILED,
    error: payload
  };
};

export const findAllProductFailed = ({ payload }) => {
  return {
    type: types.PRODUCT_FIND_ALL_REQUEST_FAILED,
    error: payload
  };
};

export const findByIdProductSucceed = ({ payload, meta = {} }) => {
  return {
    type: types.PRODUCT_FIND_BY_ID_REQUEST_SUCCEED,
    payload,
    meta
  };
};

export const queryProductSucceed = ({ payload, meta = {} }) => {
  return {
    type: types.PRODUCT_QUERY_REQUEST_SUCCEED,
    payload,
    meta
  };
};

export const findAllProductSucceed = ({ payload, meta = {} }) => {
  return {
    type: types.PRODUCT_FIND_ALL_REQUEST_SUCCEED,
    payload,
    meta
  };
};
