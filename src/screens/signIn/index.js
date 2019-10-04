import React, {PureComponent} from 'react';
import {View, Button, Touchable, Text} from '../../components';
import {Input} from 'react-native-elements';
import {signIn} from '../../store/actions';
import {connect} from 'react-redux';
import NavigationService from '../../services/NavigationService';
import {styles} from './styles'
import i18n from '../../localization';


class SignIn extends PureComponent {
 
  static navigationOptions = {
    headerLeft: (
      <Touchable
        onPress={() => NavigationService.pop(1)}
        style={styles.backButton}>
        <Text style={styles.backText}>{i18n.t('BACK_BUTTON')}</Text>
      </Touchable>
    ),
  };

  state = {
    email: '',
    password: '',
  };

  handleClick = () => {
    this.props.onSignIn(this.state.email.trim(), this.state.password);
  };

  static getDerivedStateFromProps(props) {
    if (props.loginIn != false) NavigationService.navigate('Posts');
    return null
  }

  handleChangePassword = () => (password) => {
    this.setState({password})
  }

  handleChangeEmail = () => (email) => {
    this.setState({email})
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Input
          style={styles.input}
          onChangeText={this.handleChangeEmail()}
          value={this.state.email}
          placeholder={i18n.t('LOGIN.EMAIL')}
        />
        <Input
          style={styles.input}
          onChangeText={this.handleChangePassword()}
          secureTextEntry={true}
          value={this.state.password}
          placeholder={i18n.t('LOGIN.PASSWORD')}
        />
        <Button
          onPress={this.handleClick}
          style={styles.button}
          title={i18n.t('LOGIN.LOGIN')}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
    loginIn: state.users.loginIn,
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  onSignIn: (email, password) => 
    dispatch(signIn(email, password)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
