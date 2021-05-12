import { productActionTypes as types } from "../action-types";
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
    case types["PRODUCT_QUERY_REQUEST"]:
    case types["PRODUCT_FIND_ALL_REQUEST"]: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case types["PRODUCT_REQUEST_SUCCEED"]: {
      return {
        ...state,
        isLoading: false,
        meta: {
          ...state.meta,
          ...action.meta
        }
      };
    }
    case types["PRODUCT_REQUEST_FAILED"]: {
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
  byId: getById("product")
});

const product = combineReducers({
  request,
  data: dataReducer
});

export default product;
