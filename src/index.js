import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from '../src/screens/navigator';
import NavigationService from '../src/services/NavigationService';
import {applyMiddleware, createStore, compose} from 'redux';
import {AsyncStorage} from 'react-native';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './store/reducers';
import {PersistGate} from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root2',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

//persistor.purge();
const Root = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </PersistGate>
  </Provider>
);

export default Root;
