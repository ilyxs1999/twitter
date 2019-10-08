import React, {PureComponent} from 'react';
import {View, Button} from '../../components';
import NavigationService from '../../services/NavigationService';
import {Image} from 'react-native';
import {styles} from './styles';
import {connect} from 'react-redux';
import {LOGO} from '../../constants/img';
import i18n from '../../localization';


class Auth extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    if (this.props.loginIn) this.props.navigation.navigate('Posts');
  }

  navigate = name => () => {
    NavigationService.navigate(name, {});
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: LOGO,
          }}
        />
        <View>
          <Button
            onPress={this.navigate('SignIn')}
            style={styles.button}
            title={i18n.t('LOGIN.LOGIN')}
          />
          <Button
            onPress={this.navigate('SignUp')}
            style={styles.button}
            title={i18n.t('LOGIN.REGISTER')}
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
