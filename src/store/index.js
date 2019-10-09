import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {AsyncStorage} from 'react-native';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root2',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];
export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
);
export const persistor = persistStore(store);
