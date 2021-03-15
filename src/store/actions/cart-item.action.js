import { cartItemActionTypes as types } from '../action-types';

export const queryCartItem = ({ query, actions = {} }) => {
  return {
    type: types.CARTITEM_QUERY_REQUEST,
    query,
    actions,
  };
};

export const queryCartItemSucceed = ({ payload, meta = {} }) => {
  return {
    type: types.CARTITEM_QUERY_REQUEST_SUCCEED,
    payload,
    meta,
  };
};

export const createCartItem = ({ payload, actions = {} }) => {
  return {
    type: types.CARTITEM_CREATE_REQUEST,
    payload,
    actions,
  };
};

export const createCartItemSucceed = ({ payload, meta = {} }) => {
  return {
    type: types.CARTITEM_CREATE_REQUEST_SUCCEED,
    payload,
    meta,
  };
};

export const updateCartItem = ({ payload, actions = {} }) => {
  return {
    type: types.CARTITEM_UPDATE_REQUEST,
    payload,
    actions,
  };
};

export const updateCartItemSucceed = ({ payload, meta = {} }) => {
  return {
    type: types.CARTITEM_UPDATE_REQUEST_SUCCEED,
    payload,
    meta,
  };
};

export const deleteCartItem = ({ payload, actions = {} }) => {
  return {
    type: types.CARTITEM_DELETE_REQUEST,
    payload,
    actions,
  };
};

export const deleteCartItemSucceed = ({ payload, meta = {} }) => {
  return {
    type: types.CARTITEM_DELETE_REQUEST_SUCCEED,
    payload,
    meta,
  };
};
