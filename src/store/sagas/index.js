import { all } from "redux-saga/effects";
import cartItem from "./cart-item.saga";
import category from "./category.saga";
import item from "./item.saga";
import product from "./product.saga";
import productBrand from "./product-brand.saga";

export default function* rootSaga() {
  yield all([category(), item(), cartItem(), product(), productBrand()]);
}
