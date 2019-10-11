import {NavigationActions, StackActions} from 'react-navigation';

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

function replace(routeName) {
  _navigator.dispatch(StackActions.replace(routeName));

}

export default {
  replace,
  pop,
  reset,
  navigate,
  setTopLevelNavigator,
};
