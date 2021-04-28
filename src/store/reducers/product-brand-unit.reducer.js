import { productBrandUnitActionTypes as types } from "../action-types";
import { getById } from "./extract-id.reducer";
import { combineReducers } from "redux";

const initialState = {
  request: {
    isLoading: false,
    meta: {},
    error: null
  },
  data: {}
};
const request = (state = initialState.request, action) => {
  switch (action.type) {
    case types["PRODUCT-BRAND-UNIT_QUERY_REQUEST"] ||
      types["PRODUCT-BRAND-UNIT_FIND_ALL_REQUEST"]: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case types["PRODUCT-BRAND-UNIT_REQUEST_SUCCEED"]: {
      return {
        ...state,
        isLoading: false,
        meta: {
          ...state.meta,
          ...action.meta
        }
      };
    }
    case types["PRODUCT-BRAND-UNIT_REQUEST_FAILED"]: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    }
    default:
      return state;
  }
};

const dataReducer = combineReducers({
  byId: getById("product-brand-unit")
});

const cartItemReducer = combineReducers({
  request,
  data: dataReducer
});

export default cartItemReducer;
