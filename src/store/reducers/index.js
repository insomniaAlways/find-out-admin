import { combineReducers } from 'redux';
import session from './session.reducer';
import category from './category.reducer';
import item from './item.reducer';
import cartItem from './cart-item.reducer';

const reducers = combineReducers({ session, category, item, cartItem });

export default reducers;
