import React, {PureComponent} from 'react';
import {View, Button, Touchable, Text} from '../../components';
import {Input} from 'react-native-elements';
import {signUp} from '../../store/actions';
import {connect} from 'react-redux';
import NavigationService from '../../services/NavigationService';
import {styles} from './styles';
import * as values from '../../constants/values';
import * as schema from '../../constants/validationSchema';
import i18n from '../../localization';


class SignUp extends PureComponent {

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
    username: '',
    email: '',
    password: '',
    isValid: {usernameError: true, emailError: true, passwordError: true},
  };

  validation = (username, email, password) => {
    let usernameError = schema.schemaUsername.isValidSync({
      name: username,
    });
    let emailError = schema.schemaEmail.isValidSync({
      email: email,
    });
    let passwordError = schema.schemaPassword.isValidSync({
      password: password,
    });
    const isValid = {
      usernameError,
      emailError,
      passwordError,
    };
    if (usernameError && emailError && passwordError) {
      this.setState({isValid: isValid});
      return true;
    } else {
      this.setState({isValid: isValid});
      return false;
    }
  };

  handleClick = () => {
    const username = this.state.username.trim();
    const email = this.state.email.trim();

    const password = this.state.password;
    const isValid =this.validation(username, email, password);
    if (isValid) {
      this.props.onSignUp(username, email, password);
      NavigationService.navigate('Auth', {});
    }
  };

  handleChangeEmail = () => email => {
    this.setState({email});
  };

  handleChangeUsername = () => username => {
    this.setState({username});
  };

  handleChangePassword = () => password => {
    this.setState({password});
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          style={styles.input}
          onChangeText={this.handleChangeUsername()}
          value={this.state.username}
          placeholder={i18n.t('LOGIN.USERNAME')}
        />
        {!this.state.isValid.usernameError && (
          <Text
            ref={component => (this.usernameError = component)}
            style={styles.errorText}>
            {i18n.t('LOGIN.IS_VALID_USERNAME')}
          </Text>
        )}
        <Input
          ref={component => (this.emailInput = component)}
          style={styles.input}
          onChangeText={this.handleChangeEmail()}
          value={this.state.email}
          placeholder={i18n.t('LOGIN.EMAIL')}
        />
        {!this.state.isValid.emailError && (
          <Text
            ref={component => (this.usernameError = component)}
            style={styles.errorText}>
            {i18n.t('LOGIN.IS_VALID_EMAIL')}
          </Text>
        )}
        <Input
          ref={component => (this.passwordInput = component)}
          style={styles.input}
          onChangeText={this.handleChangePassword()}
          secureTextEntry={true}
          value={this.state.password}
          placeholder={i18n.t('LOGIN.PASSWORD')}
        />
        {!this.state.isValid.passwordError && (
          <Text
            ref={component => (this.usernameError = component)}
            style={styles.errorText}>
            {i18n.t('LOGIN.IS_VALID_PASSWORD')}
          </Text>
        )}
        <Button
          onPress={this.handleClick}
          style={styles.button}
          title={i18n.t('LOGIN.REGISTER')}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
  onSignUp: (username, email, password) =>
    dispatch(signUp(username, email, password)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
