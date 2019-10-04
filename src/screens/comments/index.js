import React, {PureComponent} from 'react';
import {View, ScrollView, SafeAreaView, TextInput} from 'react-native';
import {Text, Touchable, Button} from '../../components';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';
import NavigationService from '../../services/NavigationService';
import {Post} from '../../components/post';
import {Comment} from '../../components/comment';
import {addComment} from '../../store/actions';
import ImagePicker from 'react-native-image-picker';
import {styles} from './styles'

class Comments extends PureComponent {
  static navigationOptions = {
    headerLeft: (
      <Touchable
        onPress={() => NavigationService.navigate('Posts')}
        style={styles.backButton}>
        <Text style={styles.backText}>{'<  Back'}</Text>
      </Touchable>
    ),
  };
  state = {
    commentText: '',
    image: null,
  };
  getTime = post => {
    const date = new Date(post.time);
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  };

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
  addComment = (post, commentText, user, image) => {
    this.props.addComment(post, commentText, user, image);
    this.setState({commentText: '', image: null});
  };

  render() {
    const post = this.props.navigation.getParam('post');

    return (
      <SafeAreaView
        style={styles.container}>
        <ScrollView
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({animated: true});
          }}>
          <Post
            avatar={post.user.avatarUri}
            avatarOnPress={() =>
              NavigationService.navigate('Profile', {user: post.user})
            }
            username={post.user.username}
            postText={post.postText}
            postImage={post.image}
            postTime={this.getTime(post)}
          />
          <ListItem title={'Comments'} bottomDivider />
          {post.comments.map(function(comment) {
            return (
              <Comment
                avatar={comment.user.avatarUri}
                avatarOnPress={() =>
                  NavigationService.navigate('Profile', {user: comment.user})
                }
                username={comment.user.username}
                commentText={comment.commentText}
                commentImage={comment.commentImage}
                commentTime={
                  new Date(comment.time).getHours() +
                  ':' +
                  new Date(comment.time).getMinutes() +
                  ':' +
                  new Date(comment.time).getSeconds()
                }
              />
            );
          })}
        </ScrollView>
        <TextInput
          style={styles.input}
          value={this.state.commentText}
          onChangeText={commentText => this.setState({commentText})}
          placeholder={'write your post'}
          multiline={true}
          scrollEnabled={true}
        />
        <View style={styles.buttonGroup}>
          <Button
            onPress={() =>
              this.addComment(
                post,
                this.state.commentText,
                this.props.user,
                this.state.image,
              )
            }
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
    user: state.users.user,
  };
};

const mapDispatchToProps = dispatch => ({
  addComment: (post, commentText, user, image) => {
    dispatch(addComment(post, commentText, user, image));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comments);
