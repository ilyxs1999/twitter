import React, {PureComponent} from 'react';
import {View, Text, Touchable} from '../../components';
import {Alert} from '../../components/overlay';
import {Avatar, ListItem} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {styles} from './styles'
import {
  setAvatar,
  logOut,
  changeUsername,
  changePassword,
  changeEmail,
} from '../../store/actions';
import NavigationService from '../../services/NavigationService';

class Account extends PureComponent {
  state = {
    type: null,
    text: '',
    avatarUri: this.props.user.avatarUri,
    overlayVisible: false,
  };

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
  logOut = () => {
    this.props.logOut();
    NavigationService.navigate('Auth');
    NavigationService.reset('Auth');
  };
  handleClick = type => {
    this.state.type = type;
    this.setState({overlayVisible: true});
  };
  save = () => {
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
    this.setState({overlayVisible: false});
  };
  close = () => {
    this.clean();
    this.setState({overlayVisible: false});
  };
  clean = () => {
    this.setState({text: ''});
  };

  static navigationOptions = {
    headerLeft: (
      <Touchable
        onPress={() => NavigationService.reset('Posts')}
        style={{padding: 10}}>
        <Text style={{fontSize: 18}}>{'<  Back'}</Text>
      </Touchable>
    ),
  };

  render() {
    list = [
      {
        title: 'username: ' + this.props.user.username,
        type: 'USERNAME',
      },
      {
        title: 'email: ' + this.props.user.email,
        type: 'EMAIL',
      },
      {
        title: 'Change password',
        type: 'PASSWORD',
      },
    ];

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

        {list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            bottomDivider
            onPress={() => this.handleClick(item.type)}
          />
        ))}
        <ListItem
          title={'Log out'}
          bottomDivider
          onPress={() => this.logOut()}
        />
        <Alert
          isVisible={this.state.overlayVisible}
          value={this.state.text}
          onChangeText={text => this.setState({text})}
          saveFunc={() => this.save()}
          back={() => this.close()}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.users.user,
  };
};

const mapDispatchToProps = dispatch => ({
  setAvatar: avatarUri => {
    dispatch(setAvatar(avatarUri));
  },
  logOut: () => {
    dispatch(logOut());
  },
  changeUsername: username => {
    dispatch(changeUsername(username));
  },
  changePassword: password => {
    dispatch(changePassword(password));
  },
  changeEmail: eamil => {
    dispatch(changeEmail(eamil));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);
