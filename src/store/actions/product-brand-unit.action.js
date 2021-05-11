import { productBrandUnitActionTypes as types } from "../action-types";

export const findByIdProductBrandUnit = ({ product_brand_unit_id, actions = {} }) => {
  return {
    type: types["PRODUCT-BRAND-UNIT_FIND_BY_ID_REQUEST"],
    product_brand_unit_id,
    actions
  };
};

export const queryProductBrandUnit = ({ query, actions = {} }) => {
  return {
    type: types["PRODUCT-BRAND-UNIT_QUERY_REQUEST"],
    query,
    actions
  };
};

export const findAllProductBrandUnit = ({ actions = {} }) => {
  return {
    type: types["PRODUCT-BRAND-UNIT_FIND_ALL_REQUEST"],
    actions
  };
};

export const storeProductBrandUnit = ({ payload, meta = {} }) => {
  return {
    type: types["PRODUCT-BRAND-UNIT_REQUEST_SUCCEED"],
    payload,
    meta
  };
};

export function deleteProductBrandUnit({ product_brand_unit_id, actions = {} }) {
  return {
    type: types["PRODUCT-BRAND-UNIT_DELETE_REQUEST"],
    product_brand_unit_id,
    actions
  };
}

export function deleteProductBrandUnitSucceed({ product_brand_unit_id, meta = {} }) {
  return {
    type: types["PRODUCT-BRAND-UNIT_DELETE_SUCCEED"],
    id: product_brand_unit_id,
    meta
  };
}
