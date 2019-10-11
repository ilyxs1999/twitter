import React, {PureComponent} from 'react';
import {View, Button} from '../../components';
import NavigationService from '../../services/NavigationService';
import {Image} from 'react-native';
import {styles} from './styles';
import {connect} from 'react-redux';
import {LOGO} from '../../constants/img';
import i18n from '../../localization';
import {LOGIN,REGISTER,POSTS} from "../../constants/routes"


class Auth extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    i18n.locale = this.props.language
    if (this.props.isLogin) this.props.navigation.navigate(POSTS);
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
            onPress={this.navigate(LOGIN)}
            style={styles.button}
            title={i18n.t('LOGIN.LOGIN')}
          />
          <Button
            onPress={this.navigate(REGISTER)}
            style={styles.button}
            title={i18n.t('LOGIN.REGISTER')}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  language : state.language.language
});

export default connect(mapStateToProps)(Auth);
