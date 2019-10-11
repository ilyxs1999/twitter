import React from 'react';
import {View, TextInput} from 'react-native';
import i18n from '../localization';
import {CheckBox, Icon, Tooltip} from 'react-native-elements';
import {Button, Touchable, Text} from '.';
import {styles} from './styles';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import {sendPost, sendVoicePost} from '../store/posts/actions';
import ids from 'shortid';


class SendPostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      postText: '',
      image: null,
      location: null,
      path: '',
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }

  chooseFile = () => {
    let options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({image: response.uri});
      }
    });
  };

  getLocation = () => {
    Geolocation.getCurrentPosition(location => {
      const cords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 1,
        longitudeDelta: 1,
      };
      this.setState({location: cords});
    });
  };

  handleCheckBox = async () => {
    if (this.state.checked) {
      await this.setState({path: `${ids.generate()}.m4a`});
      this.onStartRecord();
    } else {
      this.onStopRecord();
      await this.props.sendVoicePost(this.props.user, this.state.path);
    }
    this.setState({checked: !this.state.checked});
  };

  onStartRecord = async () => {
    await this.audioRecorderPlayer.startRecorder(this.state.path);
    this.audioRecorderPlayer.addRecordBackListener();
  };

  onStopRecord = async () => {
    await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
  };

  sendPost = () => {
    this.props.sendPost(
      this.props.user,
      this.state.postText,
      this.state.image,
      this.state.location,
    );

    this.setState({postText: '', image: null, location: null});
  };

  render() {
    return (
      <View>
        {this.state.checked && (
          <TextInput
            style={styles.input}
            value={this.state.postText}
            onChangeText={postText => this.setState({postText})}
            placeholder={i18n.t('POSTS.WRITE_YOUR_POST')}
            maxLength={240}
            multiline={true}
            scrollEnabled={true}
          />
        )}

        <View style={styles.buttonGroup}>
          <CheckBox
            checkedIcon={<Icon name="mic-none" />}
            uncheckedIcon={<Icon name="stop" />}
            checked={this.state.checked}
            onPress={this.handleCheckBox}
            containerStyle={styles.recorder}
          />
          <Button
            onPress={this.sendPost}
            title={i18n.t('POSTS.SEND')}
            style={styles.sendButton}
          />
          <View style={styles.location}>
            <Icon name={'my-location'} onPress={this.getLocation} />
          </View>
          <Tooltip
            width={100}
            containerStyle={styles.tooltip}
            popover={
              <Touchable onPress={this.chooseFile}>
                <Text>{i18n.t('POSTS.LOAD_IMAGE')}</Text>
              </Touchable>
            }>
            <Icon name={'attach-file'} />
          </Tooltip>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
    user: state.user.user,
  });
  
  const mapDispatchToProps = dispatch => ({
    sendPost: (user, postText, image, location) =>
      dispatch(sendPost(user, postText, image, location)),
    sendVoicePost: (user, path) => dispatch(sendVoicePost(user, path)),
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SendPostView);
