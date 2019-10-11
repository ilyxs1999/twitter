import {applyMiddleware, combineReducers, createStore} from 'redux';
import {AsyncStorage} from 'react-native';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import posts from './posts';
import language from './language';
import user from './user';
import auth from './auth';


rootReducer = combineReducers({
  user,
  posts,
  language,
  auth,
});

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
