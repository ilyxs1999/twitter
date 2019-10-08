import React, {PureComponent} from 'react';
import {View, Button} from '../../components';
import {Icon} from 'react-native-elements';
import {signIn} from '../../store/actions';
import {connect} from 'react-redux';
import NavigationService from '../../services/NavigationService';
import {styles} from './styles';
import i18n from '../../localization';
import {Formik} from 'formik';
import {TextInput} from 'react-native';


class SignIn extends PureComponent {
  static navigationOptions = {
    headerLeft: (
      <Icon name="arrow-back" onPress={() => NavigationService.pop(1)} />
    ),
  };

  static getDerivedStateFromProps(props) {
    if (props.loginIn != false) NavigationService.navigate('Posts');
    return null;
  }

  handleClick = values => {
    this.props.onSignIn(values.email.trim(), values.password);
  };

  render() {
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={this.handleClick}>
          {({values, handleChange, setFieldTouched, handleSubmit}) => (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                placeholder={i18n.t('LOGIN.EMAIL')}
              />
              <TextInput
                style={styles.input}
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder={i18n.t('LOGIN.PASSWORD')}
                onBlur={() => setFieldTouched('password')}
                secureTextEntry={true}
              />
              <Button title={i18n.t('LOGIN.LOGIN')} onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  loginIn: state.users.loginIn,
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  onSignIn: (email, password) => dispatch(signIn(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
