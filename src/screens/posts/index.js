import React from 'react';
import {View, Touchable, Text} from '../../components';
import {Button} from '../../components';
import {TextInput, Image, SafeAreaView, FlatList} from 'react-native';
import * as COLORS from '../../constants/colors';
import {Icon, CheckBox, Overlay, Tooltip} from 'react-native-elements';
import NavigationService from '../../services/NavigationService';
import {connect} from 'react-redux';
import {sendPost, likePost, sendVoicePost} from '../../store/actions';
import ImagePicker from 'react-native-image-picker';
import Post from '../../components/post';
import {styles} from './styles';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import ids from 'shortid';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import i18n from '../../localization';


class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postText: '',
      posts: props.posts,
      image: null,
      location: null,
      isVisible: false,
      fullScreenImage: null,
      isVisibleFullMap: false,
      fullScreenMap: null,
      checked: true,
      path: '',
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }

  static navigationOptions = {
    headerTitle: (
      <Icon
        name="account-box"
        color={COLORS.BLACK}
        onPress={() => NavigationService.navigate('Account')}
      />
    ),
    headerRight: (
      <Icon
        name="settings"
        color={COLORS.BLACK}
        onPress={() => NavigationService.navigate('Settings')}
      />
    ),
  };

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

  openMap = location => () => {
    this.setState({fullScreenMap: location, isVisibleFullMap: true});
  };
  closeMap = () => {
    this.setState({fullScreenMap: null, isVisibleFullMap: false});
  };

  openImage = image => () => {
    this.setState({fullScreenImage: image, isVisible: true});
  };

  closeImage = () => {
    this.setState({fullScreenImage: null, isVisible: false});
  };

  static getDerivedStateFromProps(props, state) {
    if (state.posts.length < props.posts.length) {
      const posts = props.posts;
      return {posts};
    }
    return null;
  }
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

  navigate = (name, params) => () => {
    NavigationService.navigate(name, params);
  };

  render() {
    console.log(this.state.fullScreenMap)
    return (
      <SafeAreaView style style={styles.container}>
        <FlatList
          extraData={this.state}
          inverted={true}
          style={styles.card}
          onEndReached={this.loadData}
          data={this.state.posts}
          renderItem={({item}) => (
            <Touchable onPress={this.navigate('Comments', {post: item})}>
              <Post
                post={item}
                postLocationOnPress={this.openMap(item.location)}
                postImageOnPress={this.openImage(item.image)}
                audioRecorderPlayer={this.audioRecorderPlayer}
              />
            </Touchable>
          )}
          keyExtractor={post => post.postId}
        />

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
            width={80}
            containerStyle={styles.tooltip}
            popover={
              <Touchable onPress={this.chooseFile}>
                <Text>{i18n.t('POSTS.LOAD_IMAGE')}</Text>
              </Touchable>
            }>
            <Icon name={'attach-file'} />
          </Tooltip>
        </View>
        <Overlay fullScreen={true} isVisible={this.state.isVisible}>
          <SafeAreaView style={styles.overlay}>
            <Image
              style={styles.fullScreenImage}
              source={{uri: this.state.fullScreenImage}}
            />
            <Button onPress={this.closeImage} title={i18n.t('POSTS.CLOSE')} />
          </SafeAreaView>
        </Overlay>
        <Overlay fullScreen={true} isVisible={this.state.isVisibleFullMap}>
          <SafeAreaView style={styles.overlay}>
            <MapView
              style={styles.overlay}
              initialRegion={this.state.fullScreenMap}>
              <Marker coordinate={this.state.fullScreenMap} />
            </MapView>
            <Button onPress={this.closeMap} title={i18n.t('POSTS.CLOSE')} />
          </SafeAreaView>
        </Overlay>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.user,
  posts: state.posts.posts,
});

const mapDispatchToProps = dispatch => ({
  sendPost: (user, postText, image, location) =>
    dispatch(sendPost(user, postText, image, location)),
  likePost: (user, postText) => dispatch(likePost(user, postText)),
  sendVoicePost: (user, path) => dispatch(sendVoicePost(user, path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts);
