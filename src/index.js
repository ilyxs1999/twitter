import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from '../src/screens/navigator';
import NavigationService from '../src/services/NavigationService';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {AsyncStorage} from 'react-native';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './store/reducers';
import {PersistGate} from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import {MenuProvider} from 'react-native-popup-menu';

const persistConfig = {
  key: 'root2',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];
const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

//persistor.purge();
const Root = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <MenuProvider>
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </MenuProvider>
    </PersistGate>
  </Provider>
);

export default Root;
