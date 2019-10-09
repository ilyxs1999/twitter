import React from 'react';
import {View} from 'react-native';
import {Text} from "../components"
import {CheckBox, Icon, Slider} from 'react-native-elements';
import moment from 'moment';
import { styles } from './styles';
import {PLAY_TIME_FORMAT} from '../constants/values'


export default class VoicePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      currentDuration: '0',
      currentTime: '0',
    };
    this.audioRecorderPlayer = this.props.audioRecorderPlayer;
  }

  playOnPress = () => {
    this.setState({checked: !this.state.checked}, () => {
      if (
        this.state.checked &&
        this.state.currentDuration === this.state.currentTime
      ) {
        this.onStartPlay().catch((error)=>{
       });
      } else if (this.state.checked) {
        this.onResumePlay().catch((error)=>{
       });
      } else {
        this.onStopPlay();
      }
    });
  };

  onStartPlay = async () => {
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
    await this.audioRecorderPlayer.startPlayer(this.props.path);
    this.audioRecorderPlayer.addPlayBackListener(e => {
      if (e.current_position === e.duration) {
        this.audioRecorderPlayer.stopPlayer();
        this.setState({
          checked: !this.state.checked,
          currentDuration: '0',
          currentTime: '0',
        });
        this.audioRecorderPlayer.removePlayBackListener();
      }

      this.setState({
        currentTime: e.current_position,
        currentDuration: e.duration,
      });
      return;
    });
  };

  onStopPlay = () => {
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };

  onResumePlay = async () => {
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
    await this.audioRecorderPlayer.startPlayer(this.props.path);
    this.audioRecorderPlayer.seekToPlayer(this.state.currentTime);
    this.audioRecorderPlayer.addPlayBackListener(e => {
      if (e.current_position === e.duration) {
        this.audioRecorderPlayer.stopPlayer();
        this.setState({
          checked: !this.state.checked,
          currentDuration: '0',
          currentTime: '0',
        });
        this.audioRecorderPlayer.removePlayBackListener();
      }

      this.setState({
        currentTime: e.current_position,
        currentDuration: e.duration,
      });
      return;
    });
  };

  seekTo = value => {
    this.setState({currentTime: value});
    this.audioRecorderPlayer.seekToPlayer(value);
  };

  render() {
    return (
      <View
        style={styles.voicePlayerContainer}>
        <CheckBox
          uncheckedIcon={<Icon name="play-arrow" />}
          checkedIcon={<Icon name="stop" />}
          checked={this.state.checked}
          onPress={this.playOnPress}
        />
        <Slider
          style={styles.slider}
          maximumValue={parseInt(this.state.currentDuration)}
          value={parseInt(this.state.currentTime)}
          onValueChange={this.seekTo}
        />
        <Text>{`${moment(parseInt(this.state.currentTime)).format(
          PLAY_TIME_FORMAT,
        )}`}</Text>
      </View>
    );
  }
}
