import { all } from "redux-saga/effects";
import category from "./category.saga";
import product from "./product.saga";
import productBrand from "./product-brand.saga";
import productBrandUnit from "./product-brand-unit.saga";
import session from "./session.saga";
import sellerProduct from "./seller-product.saga";

export default function* rootSaga() {
  yield all([
    category(),
    session(),
    product(),
    productBrand(),
    sellerProduct(),
    productBrandUnit()
  ]);
}
