import React, {PureComponent} from 'react';
import {View, Button, Text} from '../../components';
import {Icon} from 'react-native-elements';
import {signUp} from '../../store/actions';
import {connect} from 'react-redux';
import NavigationService from '../../services/NavigationService';
import {styles} from './styles';
import {Formik} from 'formik';
import schema from '../../constants/validationSchema';
import i18n from '../../localization';
import {TextInput} from 'react-native';


class SignUp extends PureComponent {
  static navigationOptions = {
    headerLeft: (
      <Icon name="arrow-back" onPress={() => NavigationService.pop(1)} />
    ),
  };

  onSubmit = values => {
    this.props.onSignUp(values.username, values.email, values.password);
    NavigationService.navigate('Auth', {});
  };

  render() {
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{username: '', email: '', password: ''}}
          validationSchema={schema}
          onSubmit={this.onSubmit}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={() => setFieldTouched('username')}
                placeholder={i18n.t("LOGIN.USERNAME")}
              />
              {touched.username && errors.username && (
                <Text style={styles.textError}>
                  {errors.username}
                </Text>
              )}
              <TextInput
                style={styles.input}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                placeholder={i18n.t("LOGIN.EMAIL")}
              />
              {touched.email && errors.email && (
                <Text style={styles.textError}>{errors.email}</Text>
              )}
              <TextInput
                style={styles.input}
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder={i18n.t("LOGIN.PASSWORD")}
                onBlur={() => setFieldTouched('password')}
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Text style={styles.textError}>
                  {errors.password}
                </Text>
              )}
              <Button
                title={i18n.t("LOGIN.REGISTER")}
                disabled={!isValid}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
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
