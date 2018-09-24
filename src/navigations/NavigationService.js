import { NavigationActions, StackActions, DrawerActions } from 'react-navigation';

let _navigator;
var beforeScreen = '';

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params, key) {
  _navigator.dispatch(
    NavigationActions.navigate({
      type: NavigationActions.NAVIGATE,
      routeName,
      params,
      key
    })
  );
}

function reset(routeName) {
  _navigator.dispatch(
    StackActions.reset({
      type: StackActions.RESET,
      routeName,
      index: 0,
      actions: [NavigationActions.navigate({ routeName: routeName, reload: false })]
    })
  );
}

function drawer() {
  _navigator.dispatch(
    DrawerActions.toggleDrawer()
  );
}

function drawerClose() {
  _navigator.dispatch(
    DrawerActions.closeDrawer()
  );
}

export default {
  navigate,
  setTopLevelNavigator,
  reset,
  drawer,
  drawerClose
};
