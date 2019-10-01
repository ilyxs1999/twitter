import React from 'react';
import {View, Touchable, Text} from '../../components';
import {Button} from '../../components';
import {ScrollView, TextInput, Image, SafeAreaView} from 'react-native';
import * as COLORS from '../../constants/colors';
import {Icon, Card, Overlay} from 'react-native-elements';
import NavigationService from '../../services/NavigationService';
import {connect} from 'react-redux';
import {sendPost, likePost} from '../../store/actions';
import ImagePicker from 'react-native-image-picker';
import {Post} from '../../components/post';
import {styles} from './styles';
import * as values from '../../constants/values';
import * as lodash from 'lodash';
import * as image from '../../constants/img';
import moment from 'moment'

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postText: '',
      posts: props.posts,
      image: null,
      isVisible: false,
      fullScreenImage : null
    };
    this.scrollView = null;
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

  chooseFile = () => () => {
    let options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({image: response.uri});
      }
    });
  };

  openImage = (image) =>() => {
    this.setState({fullScreenImage : image,isVisible: true});
  };

  closeImage = () => {
    this.setState({fullScreenImage : null,isVisible: false});
  };

  static getDerivedStateFromProps(props, state) {
    if (state.posts.length < props.posts.length) {
      const posts = props.posts;
      return {posts};
    }
    return null;
  }

  sendPost = () => {
    this.props.sendPost(this.props.user, this.state.postText, this.state.image);

    this.setState({postText: '', image: null});
  };

  scrollToEnd = () => {
    this.scrollView.scrollToEnd();
  };

  getTime = i => {
    const date = new Date(this.state.posts[i].time);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  navigate = (name, params) => () => {
    NavigationService.navigate(name, params);
  };

  render() {
    return (
      <SafeAreaView style style={styles.container}>
        <Card containerStyle={styles.card}>
          <ScrollView
            ref={scrollView => {
              this.scrollView = scrollView;
            }}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({animated: true});
            }}>
            {this.state.posts.map((post, index) => (
              <Touchable
                key={index}
                onPress={this.navigate('Comments', {post: post})}>
                <Post
                  avatar={lodash.get(post, 'user.avatarUri', image.AVATAR)}
                  avatarOnPress={this.navigate('Profile', {user: post.user})}
                  username={lodash.get(
                    post,
                    'user.username',
                    values.DEFAULT_USERNAME,
                  )}
                  postImageOnPress={this.openImage(post.image)}
                  postText={post.postText}
                  postImage={post.image}
                  postTime={`${moment(post.time).format(values.DATE_FORMAT)}`}
                />
              </Touchable>
            ))}
          </ScrollView>
        </Card>
        <TextInput
          style={styles.input}
          value={this.state.postText}
          onChangeText={postText => this.setState({postText})}
          placeholder={values.WRITE_YOUR_POST}
          maxLength={240}
          multiline={true}
          scrollEnabled={true}
        />
        <View style={styles.buttonGroup}>
          <Button
            onPress={this.sendPost}
            title={values.SEND}
            style={styles.sendButton}
          />
          <Button
            onPress={this.chooseFile()}
            title={values.LOAD_IMAGE}
            style={styles.chooseButton}
          />
        </View>
        <Overlay
          fullScreen={true}
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({isVisible: false})}>
            <SafeAreaView style={styles.overlay}>
              <Image style={styles.fullScreenImage} source={{uri : this.state.fullScreenImage}}/>
          <Button onPress={this.closeImage} title={'close'} />
          </SafeAreaView>
        </Overlay>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  like: state.posts.like,
  user: state.users.user,
  posts: state.posts.posts,
});

const mapDispatchToProps = dispatch => ({
  sendPost: (user, postText, image) =>
    dispatch(sendPost(user, postText, image)),
  likePost: (user, postText) => dispatch(likePost(user, postText)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts);
