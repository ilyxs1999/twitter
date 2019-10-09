import React, {PureComponent} from 'react';
import {View, Text, Touchable, Button} from '../../components';
import {Alert} from '../../components/overlay';
import {Avatar, Icon, ListItem, Divider} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {styles} from './styles';
import * as values from '../../constants/values';
import i18n from '../../localization';
import {logOut, changeUserInfo} from '../../store/actions';
import NavigationService from '../../services/NavigationService';
import {POSTS,AUTH} from "../../constants/routes"

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
        this.props.changeUserInfo(response.uri, values.TYPE_AVATAR_URI);
        this.setState({avatarUri: response.uri});
      }
    });
  };

  logOut = () => {
    this.props.logOut();

    NavigationService.navigate(AUTH);
  };

  handleClick = type => () => {
    this.setState({type, overlayVisible: true});
  };

  save = () => {
    this.props.changeUserInfo(this.state.text, this.state.type);

    this.clean();
  };

  close = () => {
    this.clean();
  };

  clean = () => {
    this.setState({text: '', overlayVisible: false});
  };

  handleChangeText = text => {
    this.setState({text});
  };

  static navigationOptions = {
    headerLeft: (
      <Icon
        name="arrow-back"
        onPress={() => NavigationService.reset(POSTS)}
      />
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
            <Text style={styles.textInfo}>{`${i18n.t('LOGIN.USERNAME')}: ${this.props.user.username }`}</Text>
            <Icon name="create" color='#a0a1a3'/>
          </Touchable>
          <Divider style={{ marginBottom : 10, marginTop : 10}} />
          <Touchable
            style={styles.textContainer}
            onPress={this.handleClick(values.TYPE_EMAIL)}>
            <Text style={styles.textInfo}>{`${i18n.t('LOGIN.EMAIL')}: ${this.props.user.email}`}</Text>
            <Icon name="create" color='#a0a1a3' />
          </Touchable>
          <Divider style={{ marginBottom : 10, marginTop : 10}} />
          <Touchable
            style={styles.textContainer}
            onPress={this.handleClick(values.TYPE_PASSWORD)}>
            <Text style={styles.textInfo}>{`${i18n.t('LOGIN.CHANGE_PASSWORD',)}`}</Text>
            <Icon name="create" color='#a0a1a3' />
          </Touchable>
          <Divider style={{ marginBottom : 10, marginTop : 10}} />
        </View>
        <Button title={i18n.t('LOGIN.LOG_OUT')} onPress={this.logOut} />
        <Alert
          isVisible={this.state.overlayVisible}
          value={this.state.text}
          onChangeText={this.handleChangeText}
          saveFunc={this.save}
          back={this.close}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
  changeUserInfo: (text, userField) =>
    dispatch(changeUserInfo(text, userField)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);
