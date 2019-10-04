import React, {PureComponent} from 'react';
import {View, Text, Touchable, Button} from '../../components';
import {Alert} from '../../components/overlay';
import {Avatar, Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {styles} from './styles';
import * as values from '../../constants/values';
import i18n from '../../localization';
import {
  setAvatar,
  logOut,
  changeUsername,
  changePassword,
  changeEmail,
} from '../../store/actions';
import NavigationService from '../../services/NavigationService';


class Account extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      text: '',
      avatarUri: this.props.user.avatarUri,
      overlayVisible: false,
    };
  }

  chooseFile = () => {
    var options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.props.setAvatar(response.uri);

        this.setState({avatarUri: response.uri});
      }
    });
  };

  logOut = () => () => {
    this.props.logOut();

    NavigationService.navigate('Auth');
  };

  handleClick = type => () => {
    this.setState({type: type});

    this.setState({overlayVisible: true});
  };

  save = () => () => {
    switch (this.state.type) {
      case 'PASSWORD':
        this.props.changePassword(this.state.text);
        break;
      case 'USERNAME':
        this.props.changeUsername(this.state.text);
        break;
      case 'EMAIL':
        this.props.changeEmail(this.state.text);
        break;
    }
    this.clean();
  };

  close = () => () => {
    this.clean();
  };

  clean = () => {
    this.setState({text: ''});

    this.setState({overlayVisible: false});
  };

  handleChangeText = () => text => {
    this.setState({text});
  };

  static navigationOptions = {
    headerLeft: (
      <Touchable
        onPress={() => NavigationService.reset('Posts')}
        style={styles.backButtonContainer}>
        <Text style={styles.backButtonText}>{i18n.t('BACK_BUTTON')}</Text>
      </Touchable>
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Avatar
          containerStyle={styles.avatar}
          size={200}
          rounded
          source={{uri: this.state.avatarUri}}
          onPress={this.chooseFile}
          showEditButton
        />
        <View style={styles.userInfo}>
          <Touchable
            style={styles.textContainer}
            onPress={this.handleClick(values.TYPE_USERNAME)}>
            <Text
              style={
                styles.textInfo
              }>{`${i18n.t('LOGIN.USERNAME')}: ${this.props.user.username}`}</Text>
            <Icon name="create" />
          </Touchable>
          <Touchable
            style={styles.textContainer}
            onPress={this.handleClick(values.TYPE_EMAIL)}>
            <Text
              style={
                styles.textInfo
              }>{`${i18n.t('LOGIN.EMAIL')}: ${this.props.user.email}`}</Text>
            <Icon name="create" />
          </Touchable>
          <Touchable
            style={styles.textContainer}
            onPress={this.handleClick(values.TYPE_PASSWORD)}>
            <Text style={styles.textInfo}>{`${i18n.t('LOGIN.CHANGE_PASSWORD')}`}</Text>
            <Icon name="create" />
          </Touchable>
        </View>
        <Button title={i18n.t('LOGIN.LOG_OUT')} onPress={this.logOut()} />
        <Alert
          isVisible={this.state.overlayVisible}
          value={this.state.text}
          onChangeText={this.handleChangeText()}
          saveFunc={this.save()}
          back={this.close()}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  setAvatar: avatarUri => dispatch(setAvatar(avatarUri)),
  logOut: () => dispatch(logOut()),
  changeUsername: username => dispatch(changeUsername(username)),
  changePassword: password => dispatch(changePassword(password)),
  changeEmail: email => dispatch(changeEmail(email)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);
