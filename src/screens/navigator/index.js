import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SignIn from '../signIn';
import SignUp from '../signUp';
import Posts from '../posts';
import Auth from '../auth';
import Account from '../account';
import Settings from '../settings';
import Profile from '../profile';
import Comments from '../comments';
import Languages from "../languages"

const AccountNavigator = createStackNavigator({
  Posts,
  Account,
  Settings,
  Profile,
  Comments,
  Languages
});

const AuthNavigator = createStackNavigator({
  Auth,
  SignIn,
  SignUp,
});

const AppNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  App: AccountNavigator,
});

export default createAppContainer(AppNavigator);
