import { productBrandActionTypes as types } from "../action-types";

export const findByIdProductBrand = ({ product_brand_id, actions = {} }) => {
  return {
    type: types["PRODUCT-BRAND_FIND_BY_ID_REQUEST"],
    product_brand_id,
    actions
  };
};

export const queryProductBrand = ({ query, actions = {} }) => {
  return {
    type: types["PRODUCT-BRAND_QUERY_REQUEST"],
    query,
    actions
  };
};

export const findAllProductBrand = ({ actions = {} }) => {
  return {
    type: types["PRODUCT-BRAND_FIND_ALL_REQUEST"],
    actions
  };
};

export const storeProductBrand = ({ payload, meta = {} }) => {
  return {
    type: types["PRODUCT-BRAND_REQUEST_SUCCEED"],
    payload,
    meta
  };
};

export function deleteProductBrand({ product_brand_id, actions = {} }) {
  return {
    type: types["PRODUCT-BRAND_DELETE_REQUEST"],
    product_brand_id,
    actions
  };
}

export function deleteProductBrandSucceed({ product_brand_id, meta = {} }) {
  return {
    type: types["PRODUCT-BRAND_DELETE_SUCCEED"],
    id: product_brand_id,
    meta
  };
}
