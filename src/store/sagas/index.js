import { all } from 'redux-saga/effects';
import cartItem from './cart-item.saga';
import category from './category.saga';
import item from './item.saga';

export default function* rootSaga() {
  yield all([category(), item(), cartItem()]);
}
