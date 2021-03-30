import { productBrandUnitActionTypes as types } from "../action-types";

export const findByIdProductBrandUnit = ({ product_brand_unit_id, actions = {} }) => {
  return {
    type: types.PRODUCTBRANDUNIT_FIND_BY_ID_REQUEST,
    product_brand_unit_id,
    actions
  };
};

export const queryProductBrandUnit = ({ query, actions = {} }) => {
  return {
    type: types.PRODUCTBRANDUNIT_QUERY_REQUEST,
    query,
    actions
  };
};

export const findAllProductBrandUnit = ({ actions = {} }) => {
  return {
    type: types.PRODUCTBRANDUNIT_FIND_ALL_REQUEST,
    actions
  };
};

export const findByIdProductBrandUnitFailed = ({ payload }) => {
  return {
    type: types.PRODUCTBRANDUNIT_FIND_BY_ID_REQUEST_FAILED,
    error: payload
  };
};

export const queryProductBrandUnitFailed = ({ payload }) => {
  return {
    type: types.PRODUCTBRANDUNIT_QUERY_REQUEST_FAILED,
    error: payload
  };
};

export const findAllProductBrandUnitFailed = ({ payload }) => {
  return {
    type: types.PRODUCTBRANDUNIT_FIND_ALL_REQUEST_FAILED,
    error: payload
  };
};

export const findByIdProductBrandUnitSucceed = ({ payload, meta = {} }) => {
  return {
    type: types.PRODUCTBRANDUNIT_FIND_BY_ID_REQUEST_SUCCEED,
    payload,
    meta
  };
};

export const queryProductBrandUnitSucceed = ({ payload, meta = {} }) => {
  return {
    type: types.PRODUCTBRANDUNIT_QUERY_REQUEST_SUCCEED,
    payload,
    meta
  };
};

export const findAllProductBrandUnitSucceed = ({ payload, meta = {} }) => {
  return {
    type: types.PRODUCTBRANDUNIT_FIND_ALL_REQUEST_SUCCEED,
    payload,
    meta
  };
};
