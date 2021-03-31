import { productBrandActionTypes as types } from "../action-types";
import { productBrandInitialState as initialState } from "../initial-state";
import { combineReducers } from "redux";
import { getById } from "./extract-id.reducer";

const request = (state = initialState.request, action) => {
  switch (action.type) {
    case types.PRODUCTBRAND_REQUEST_INITIATED: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case types.PRODUCTBRAND_FIND_ALL_REQUEST_SUCCEED: {
      return {
        ...state,
        isLoading: false,
        meta: action.meta
      };
    }
    case types.PRODUCTBRAND_FIND_ALL_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    }
    case types.PRODUCTBRAND_FIND_BY_ID_REQUEST_SUCCEED: {
      return {
        ...state,
        isLoading: false,
        meta: action.meta
      };
    }
    case types.PRODUCTBRAND_FIND_BY_ID_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    }
    case types.PRODUCTBRAND_QUERY_REQUEST_SUCCEED: {
      return {
        ...state,
        isLoading: false,
        meta: action.meta
      };
    }
    case types.PRODUCTBRAND_QUERY_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
};

const dataReducer = combineReducers({
  byId: getById("productbrand")
});

const categoryReducer = combineReducers({
  request,
  data: dataReducer
});

export default categoryReducer;
