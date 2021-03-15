import { cartItemActionTypes as types } from '../action-types';
import { getById } from './extract-id.reducer';
import { combineReducers } from 'redux';

const initialState = {
  request: {
    isLoading: false,
    meta: {},
    error: null,
  },
  data: {},
};
const request = (state = initialState.request, action) => {
  switch (action.type) {
    case types.CARTITEM_REQUEST_INITIATED: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case types.CARTITEM_QUERY_REQUEST_SUCCEED: {
      return {
        ...state,
        isLoading: false,
        meta: {
          ...state.meta,
          ...action.meta,
        },
      };
    }
    case types.CARTITEM_QUERY_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    case types.CARTITEM_CREATE_REQUEST_SUCCEED: {
      return {
        ...state,
        isLoading: false,
        meta: {
          ...state.meta,
          ...action.meta,
        },
      };
    }
    case types.CARTITEM_CREATE_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    case types.CARTITEM_UPDATE_REQUEST_SUCCEED: {
      return {
        ...state,
        isLoading: false,
        meta: {
          ...state.meta,
          ...action.meta,
        },
      };
    }
    case types.CARTITEM_UPDATE_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    case types.CARTITEM_DELETE_REQUEST_SUCCEED: {
      return {
        ...state,
        isLoading: false,
        meta: {
          ...state.meta,
          ...action.meta,
        },
      };
    }
    case types.CARTITEM_DELETE_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

const dataReducer = combineReducers({
  byId: getById('cartitem'),
});

const cartItemReducer = combineReducers({
  request,
  data: dataReducer,
});

export default cartItemReducer;
