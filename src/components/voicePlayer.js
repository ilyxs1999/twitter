import React from 'react';
import {View, Text} from 'react-native';
import {CheckBox, Icon, Slider} from 'react-native-elements';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import moment from 'moment';

interface IState {
  checked: boolean;
  currentDuration: string;
  currentTime: string;
}

interface IProps {
  audioRecorderPlayer: AudioRecorderPlayer;
  path: string;
}

export default class VoicePlayer extends React.Component<IProps, IState> {
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
          console.log("Api call error");
          alert(error.message);
       });
      } else if (this.state.checked) {
        this.onResumePlay().catch((error)=>{
          console.log("Api call error");
          alert(error.message);
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

  seekTo = () => value => {
    this.setState({currentTime: value});
    this.audioRecorderPlayer.seekToPlayer(value);
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          alignItems: 'center',
        }}>
        <CheckBox
          uncheckedIcon={<Icon name="play-arrow" />}
          checkedIcon={<Icon name="stop" />}
          checked={this.state.checked}
          onPress={this.playOnPress}
        />
        <Slider
          style={{flex: 1, padding: 10}}
          maximumValue={parseInt(this.state.currentDuration)}
          value={parseInt(this.state.currentTime)}
          onValueChange={this.seekTo()}
        />
        <Text>{`${moment(parseInt(this.state.currentTime)).format(
          'mm:ss',
        )}`}</Text>
      </View>
    );
  }
}
