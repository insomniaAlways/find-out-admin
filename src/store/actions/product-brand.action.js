import { productBrandActionTypes as types } from "../action-types";

export const findByIdProductBrand = ({ product_brand_id, actions = {} }) => {
  return {
    type: types.PRODUCTBRAND_FIND_BY_ID_REQUEST,
    product_brand_id,
    actions
  };
};

export const queryProductBrand = ({ query, actions = {} }) => {
  return {
    type: types.PRODUCTBRAND_QUERY_REQUEST,
    query,
    actions
  };
};

export const findAllProductBrand = ({ actions = {} }) => {
  return {
    type: types.PRODUCTBRAND_FIND_ALL_REQUEST,
    actions
  };
};

export const findByIdProductBrandFailed = ({ payload }) => {
  return {
    type: types.PRODUCTBRAND_FIND_BY_ID_REQUEST_FAILED,
    error: payload
  };
};

export const queryProductBrandFailed = ({ payload }) => {
  return {
    type: types.PRODUCTBRAND_QUERY_REQUEST_FAILED,
    error: payload
  };
};

export const findAllProductBrandFailed = ({ payload }) => {
  return {
    type: types.PRODUCTBRAND_FIND_ALL_REQUEST_FAILED,
    error: payload
  };
};

export const findByIdProductBrandSucceed = ({ payload, meta = {} }) => {
  return {
    type: types.PRODUCTBRAND_FIND_BY_ID_REQUEST_SUCCEED,
    payload,
    meta
  };
};

export const queryProductBrandSucceed = ({ payload, meta = {} }) => {
  return {
    type: types.PRODUCTBRAND_QUERY_REQUEST_SUCCEED,
    payload,
    meta
  };
};

export const findAllProductBrandSucceed = ({ payload, meta = {} }) => {
  return {
    type: types.PRODUCTBRAND_FIND_ALL_REQUEST_SUCCEED,
    payload,
    meta
  };
};
