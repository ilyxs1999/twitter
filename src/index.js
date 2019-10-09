import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from '../src/screens/navigator';
import NavigationService from '../src/services/NavigationService';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store/index';

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
