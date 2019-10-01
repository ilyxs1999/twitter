import React, {PureComponent} from 'react';
import {View, Button} from '../../components';
import {Input} from 'react-native-elements';
import {signIn} from '../../store/actions';
import {connect} from 'react-redux';
import NavigationService from '../../services/NavigationService';
import {styles} from './styles'
import * as values from  '../../constants/values'

class SignIn extends PureComponent {
 
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
          placeholder={values.EMAIL}
        />
        <Input
          style={styles.input}
          onChangeText={this.handleChangePassword()}
          secureTextEntry={true}
          value={this.state.password}
          placeholder={values.PASSWORD}
        />
        <Button
          onPress={this.handleClick}
          style={styles.button}
          title={values.SIGN_IN}
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
