import React, {PureComponent} from 'react';
import Auth from '../screens/auth';
import {View} from 'react-native';
import Posts from '../screens/posts';
import {connect} from 'react-redux';
import NavigationService from '../services/NavigationService';

class App extends PureComponent {
  componentDidMount() {
    if (this.props.loginIn) this.props.navigation.navigate('Posts');
    else this.props.navigation.navigate('Auth');
  }

  render() {
    return <View />;
  }
}
const mapStateToProps = state => ({
  loginIn: state.users.loginIn,
});

export default connect(mapStateToProps)(App);
