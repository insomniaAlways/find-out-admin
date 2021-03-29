import { combineReducers } from "redux";
import session from "./session.reducer";
import category from "./category.reducer";
import item from "./item.reducer";
import product from "./product.reducer";
import productBrand from "./product.reducer";

const reducers = combineReducers({ session, category, item, product, productBrand });

export default reducers;
