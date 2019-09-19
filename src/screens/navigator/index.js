import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import App from '../index';
import SignIn from '../signIn'
import SignUp from '../signUp'


const AppNavigator = createStackNavigator(
   { 
       App:  App,
       SignIn : SignIn,
       SignUp : SignUp
   },
    {
        initialRouteName : "App"
    }
);
export default createAppContainer(AppNavigator);
 