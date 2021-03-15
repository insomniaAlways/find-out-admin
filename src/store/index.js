import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState) {
  const middlewares = [sagaMiddleware];
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlewares)),
  );
  sagaMiddleware.run(rootSaga);

  return store;
}
export default configureStore();
