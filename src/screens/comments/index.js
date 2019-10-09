import React, {PureComponent} from 'react';
import {View, ScrollView, SafeAreaView, TextInput} from 'react-native';
import {Button} from '../../components';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';
import NavigationService from '../../services/NavigationService';
import Post from '../../components/post';
import {Comment} from '../../components/comment';
import {addComment} from '../../store/actions';
import ImagePicker from 'react-native-image-picker';
import {styles} from './styles';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import i18n from '../../localization';
import {Icon} from 'react-native-elements';
import {POSTS, PROFILE} from "../../constants/routes"


class Comments extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
      image: null,
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }

  static navigationOptions = {
    headerLeft: (
      <Icon
        name="arrow-back"
        onPress={() => NavigationService.reset(POSTS)}
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

  addComment = (post, commentText, user, image) => () => {
    this.props.addComment(post, commentText, user, image);
    this.setState({commentText: '', image: null});
  };

  handleCommentChange = commentText => {
    this.setState({commentText});
  };

  navigate = (name, params) => () => {
    NavigationService.navigate(name, params);
  };

  render() {
    const post = this.props.navigation.getParam('post');
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({animated: true});
          }}>
          <Post
            post={post}
            audioRecorderPlayer={this.audioRecorderPlayer}
          />
          <ListItem title={i18n.t('POSTS.COMMENTS')} bottomDivider />
          {post.comments.map(comment => (
            <Comment
              comment={comment}
              avatarOnPress={() =>
                this.navigate(PROFILE, {user: comment.user})
              }
            />
          ))}
        </ScrollView>
        <TextInput
          style={styles.input}
          value={this.state.commentText}
          onChangeText={this.handleCommentChange}
          placeholder={i18n.t('POSTS.WRITE_YOUR_COMMENT')}
          multiline={true}
          scrollEnabled={true}
        />
        <View style={styles.buttonGroup}>
          <Button
            onPress={this.addComment(
              post,
              this.state.commentText,
              this.props.user,
              this.state.image,
            )}
            title={i18n.t('POSTS.SEND')}
            style={styles.sendButton}
          />
          <Button
            onPress={this.chooseFile}
            title={i18n.t('POSTS.LOAD_IMAGE')}
            style={styles.chooseButton}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  addComment: (post, commentText, user, image) =>
    dispatch(addComment(post, commentText, user, image)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comments);
