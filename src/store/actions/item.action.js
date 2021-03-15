import { itemActionTypes as types } from '../action-types';

export const findByIdItem = ({ item_id, actions = {} }) => {
  return {
    type: types.ITEM_FIND_BY_ID_REQUEST,
    item_id,
    actions,
  };
};

export const queryItem = ({ query, actions = {} }) => {
  return {
    type: types.ITEM_QUERY_REQUEST,
    query,
    actions,
  };
};

export const findAllItem = ({ actions = {} }) => {
  return {
    type: types.ITEM_FIND_ALL_REQUEST,
    actions,
  };
};

export const findByIdItemFailed = ({ payload }) => {
  return {
    type: types.ITEM_FIND_BY_ID_REQUEST_FAILED,
    error: payload,
  };
};

export const queryItemFailed = ({ payload }) => {
  return {
    type: types.ITEM_QUERY_REQUEST_FAILED,
    error: payload,
  };
};

export const findAllItemFailed = ({ payload }) => {
  return {
    type: types.ITEM_FIND_ALL_REQUEST_FAILED,
    error: payload,
  };
};

export const findByIdItemSucceed = ({ payload, meta = {} }) => {
  return {
    type: types.ITEM_FIND_BY_ID_REQUEST_SUCCEED,
    payload,
    meta,
  };
};

export const queryItemSucceed = ({ payload, meta = {} }) => {
  return {
    type: types.ITEM_QUERY_REQUEST_SUCCEED,
    payload,
    meta,
  };
};

export const findAllItemSucceed = ({ payload, meta = {} }) => {
  return {
    type: types.ITEM_FIND_ALL_REQUEST_SUCCEED,
    payload,
    meta,
  };
};
