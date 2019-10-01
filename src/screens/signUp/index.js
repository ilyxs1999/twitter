import React, {PureComponent} from 'react';
import {View, Button} from '../../components';
import {Input} from 'react-native-elements';
import {signUp} from '../../store/actions';
import {connect} from 'react-redux';
import NavigationService from '../../services/NavigationService';
import {styles} from './styles';
import * as yup from 'yup';
import {Text} from 'react-native';
import * as values from '../../constants/values';
import * as schema from '../../constants/validationSchema';

class SignUp extends PureComponent {
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
          placeholder={values.USERNAME}
        />
        {!this.state.isValid.usernameError && (
          <Text
            ref={component => (this.usernameError = component)}
            style={styles.errorText}>
            Username is valid
          </Text>
        )}
        <Input
          ref={component => (this.emailInput = component)}
          style={styles.input}
          onChangeText={this.handleChangeEmail()}
          value={this.state.email}
          placeholder={values.EMAIL}
        />
        {!this.state.isValid.emailError && (
          <Text
            ref={component => (this.usernameError = component)}
            style={styles.errorText}>
            Email is valid
          </Text>
        )}
        <Input
          ref={component => (this.passwordInput = component)}
          style={styles.input}
          onChangeText={this.handleChangePassword()}
          secureTextEntry={true}
          value={this.state.password}
          placeholder={values.PASSWORD}
        />
        {!this.state.isValid.passwordError && (
          <Text
            ref={component => (this.usernameError = component)}
            style={styles.errorText}>
            Password is valid
          </Text>
        )}
        <Button
          onPress={this.handleClick}
          style={styles.button}
          title={values.SING_UP}
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
