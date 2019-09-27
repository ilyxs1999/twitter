import {NavigationActions, StackActions} from 'react-navigation';
import {func} from 'prop-types';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function reset(name) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: name})],
    }),
  );
}
function pop(n) {
  _navigator.dispatch(StackActions.pop(n));
}

export default {
  pop,
  reset,
  navigate,
  setTopLevelNavigator,
};
