import React from 'react';
import {View, Touchable} from '../../components';
import {Button} from '../../components';
import {ScrollView, TextInput, StyleSheet, SafeAreaView} from 'react-native';
import * as COLORS from '../../constants/colors';
import {Icon, Card} from 'react-native-elements';
import NavigationService from '../../services/NavigationService';
import {connect} from 'react-redux';
import {sendPost, likePost} from '../../store/actions';
import ImagePicker from 'react-native-image-picker';
import {Post} from '../../components/post';
import {styles} from './styles';
class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postText: '',
      posts: props.posts,
      image: null,
    };
    this.scrollView = null;
  }
  chooseFile = () => {
    var options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({image: response.uri});
      }
    });
  };
  navigation = screen => () => {
    NavigationService.navigate(screen);
  };
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

  static getDerivedStateFromProps(props, state) {
    if (state.posts.length < props.posts.length) {
      const posts = props.posts;
      return {posts};
    }
    return null;
  }

  getPosts = () => {
    return this.props.posts.filter(
      post => post.user.email == this.props.user.email,
    );
  };
  sendPost = () => {
    let postText = '';
    const image = null;
    this.props.sendPost(this.props.user, this.state.postText, this.state.image);
    this.setState({postText, image});
  };
  scrollToEnd = () => {
    this.scrollView.scrollToEnd();
  };
  getTime = i => {
    const date = new Date(this.state.posts[i].time);
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
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
            {this.state.posts.map((post, i) => {
              return (
                <Touchable
                  onPress={() =>
                    NavigationService.navigate('Comments', {post: post})
                  }>
                  <Post
                    avatar={post.user.avatarUri}
                    avatarOnPress={() =>
                      NavigationService.navigate('Profile', {user: post.user})
                    }
                    username={post.user.username}
                    postText={post.postText}
                    postImage={post.image}
                    postTime={this.getTime(i)}
                  />
                </Touchable>
              );
            })}
          </ScrollView>
        </Card>
        <TextInput
          style={styles.input}
          value={this.state.postText}
          onChangeText={postText => this.setState({postText})}
          placeholder={'write your post'}
          maxLength={240}
          multiline={true}
          scrollEnabled={true}
        />
        <View style={styles.buttonGroup}>
          <Button
            onPress={() => this.sendPost()}
            title={'send'}
            style={styles.sendButton}
          />
          <Button
            onPress={() => this.chooseFile()}
            title={'load image'}
            style={styles.chooseButton}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {
    like: state.posts.like,
    user: state.users.user,
    posts: state.posts.posts,
  };
};

const mapDispatchToProps = dispatch => ({
  sendPost: (user, postText, image) => {
    dispatch(sendPost(user, postText, image));
  },
  likePost: (user, postText) => {
    dispatch(likePost(user, postText));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts);
