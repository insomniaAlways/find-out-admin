import { sellerProductActionTypes as types } from "../action-types";
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
    case types["SELLER-PRODUCT_QUERY_REQUEST"]:
    case types["SELLER-PRODUCT_FIND_ALL_REQUEST"]: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case types["SELLER-PRODUCT_SUCCEED"]: {
      return {
        ...state,
        isLoading: false,
        meta: {
          ...state.meta,
          ...action.meta
        }
      };
    }
    case types["SELLER-PRODUCT_FAILED"]: {
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
  byId: getById("seller-product")
});

const sellerProduct = combineReducers({
  request,
  data: dataReducer
});

export default sellerProduct;
