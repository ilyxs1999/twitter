import React, {PureComponent} from 'react';
import {View, Button} from '../../components';
import NavigationService from '../../services/NavigationService';
import {Image, StyleSheet} from 'react-native';
import {styles} from './styles';
import {connect} from 'react-redux';
import * as image from '../../constants/img'

class Auth extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    if (this.props.loginIn) this.props.navigation.navigate('Posts');
  }

  navigate = (name) => () => {
    NavigationService.navigate(name, {})
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri:
              image.LOGO,
          }}
        />
        <View>
          <Button
            onPress={this.navigate("SignIn")}
            style={styles.button}
            title="Sign in"
          />
          <Button
            onPress={this.navigate("SignUp")}
            style={styles.button}
            title="Sign up"
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  loginIn: state.users.loginIn,
});

export default connect(mapStateToProps)(Auth);