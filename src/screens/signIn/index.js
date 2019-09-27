import React, {PureComponent} from 'react';
import {View, Button} from '../../components';
import {Input} from 'react-native-elements';
import {signIn} from '../../store/actions';
import {connect} from 'react-redux';
import NavigationService from '../../services/NavigationService';
import {styles} from './styles'

class SignIn extends PureComponent {
  state = {
    email: '',
    password: '',
  };

  handleClick = () => {
    this.props.onSignIn(this.state.email.trim(), this.state.password);
  };
  static getDerivedStateFromProps(props) {
    if (props.loginIn != undefined) {
      if (props.loginIn != false) NavigationService.navigate('Posts');
    }
    return null
  }

  render() {
    return (
      <View style={styles.container}>
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
          title="Sign In"
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    loginIn: state.users.loginIn,
    user: state.users.user,
  };
};

const mapDispatchToProps = dispatch => ({
  onSignIn: (email, password) => {
    dispatch(signIn(email, password));
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
