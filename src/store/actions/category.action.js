import { categoryActionTypes as types } from "../action-types";

export const findByIdCategory = ({ category_id, actions = {} }) => {
  return {
    type: types.CATEGORY_FIND_BY_ID_REQUEST,
    category_id,
    actions
  };
};

export const queryCategory = ({ query, actions = {} }) => {
  return {
    type: types.CATEGORY_QUERY_REQUEST,
    query,
    actions
  };
};

export const findAllCategory = ({ actions = {} }) => {
  return {
    type: types.CATEGORY_FIND_ALL_REQUEST,
    actions
  };
};

export const findByIdCategoryFailed = ({ payload }) => {
  return {
    type: types.CATEGORY_FIND_BY_ID_REQUEST_FAILED,
    error: payload
  };
};

export const queryCategoryFailed = ({ payload }) => {
  return {
    type: types.CATEGORY_QUERY_REQUEST_FAILED,
    error: payload
  };
};

export const findAllCategoryFailed = ({ payload }) => {
  return {
    type: types.CATEGORY_FIND_ALL_REQUEST_FAILED,
    error: payload
  };
};

export const findByIdCategorySucceed = ({ payload, meta = {} }) => {
  return {
    type: types.CATEGORY_FIND_BY_ID_REQUEST_SUCCEED,
    payload,
    meta
  };
};

export const queryCategorySucceed = ({ payload, meta = {} }) => {
  return {
    type: types.CATEGORY_QUERY_REQUEST_SUCCEED,
    payload,
    meta
  };
};

export const findAllCategorySucceed = ({ payload, meta = {} }) => {
  debugger;
  return {
    type: types.CATEGORY_FIND_ALL_REQUEST_SUCCEED,
    payload,
    meta
  };
};
