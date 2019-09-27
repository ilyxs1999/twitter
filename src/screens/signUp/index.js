import React, {PureComponent} from 'react';
import {View, Button} from '../../components';
import {Input} from 'react-native-elements';
import {signUp} from '../../store/actions';
import {connect} from 'react-redux';
import NavigationService from '../../services/NavigationService';
import {styles} from './styles'

class SignUp extends PureComponent {
  state = {
    username: '',
    email: '',
    password: '',
  };
  
  handleClick = () => {
    this.props.onSignUp(
      this.state.username.trim(),
      this.state.email.trim(),
      this.state.password,
    );
    NavigationService.navigate('Auth', {});
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          style={styles.input}
          onChangeText={username => this.setState({username})}
          value={this.state.username}
          placeholder={'Username'}
        />
        <Input
          style={styles.input}
          onChangeText={email => this.setState({email})}
          value={this.state.email}
          placeholder={'Email'}
        />
        <Input
          style={styles.input}
          onChangeText={password => this.setState({password})}
          secureTextEntry={true}
          value={this.state.password}
          placeholder={'Password'}
        />
        <Button
          onPress={this.handleClick}
          style={styles.button}
          title="Sign Up"
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {user: state.users.user, users: state.users.users};
};

const mapDispatchToProps = dispatch => ({
  onSignUp: (username, email, password) => {
    dispatch(signUp(username, email, password));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
