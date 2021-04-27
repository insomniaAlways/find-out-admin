import { combineReducers } from "redux";
import session from "./session.reducer";
import category from "./category.reducer";
import item from "./item.reducer";
import product from "./product.reducer";
import productBrand from "./product.reducer";
import sellerProduct from "./seller-product.reducer";

const reducers = combineReducers({ session, category, item, product, productBrand, sellerProduct });

export default reducers;
