import React, {PureComponent} from 'react';
import {View, ScrollView, SafeAreaView, TextInput} from 'react-native';
import {Text, Touchable, Button} from '../../components';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';
import NavigationService from '../../services/NavigationService';
import Post from '../../components/post';
import {Comment} from '../../components/comment';
import {addComment} from '../../store/actions';
import ImagePicker from 'react-native-image-picker';
import {styles} from './styles';
import * as values from '../../constants/values';
import * as lodash from 'lodash';
import * as image from '../../constants/img';
import moment from 'moment'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import i18n from '../../localization';

class Comments extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      commentText: '',
      image: null,
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }

  static navigationOptions = {
    headerLeft: (
      <Touchable
        onPress={() => NavigationService.reset('Posts')}
        style={styles.backButton}>
        <Text style={styles.backText}>{i18n.t('BACK_BUTTON')}</Text>
      </Touchable>
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

  addComment = (post, commentText, user, image) => () => {
    this.props.addComment(post, commentText, user, image);
    this.setState({commentText: '', image: null});
  };

  handleCommentChange = () => commentText => {
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
            path={post.path}
            audioRecorderPlayer = {this.audioRecorderPlayer}
          />
          <ListItem title={i18n.t('POSTS.COMMENTS')} bottomDivider />
          {post.comments.map(comment => (
            <Comment
              avatar={lodash.get(comment, 'user.avatarUri', image.AVATAR)}
              avatarOnPress={() =>
                NavigationService.navigate('Profile', {user: comment.user})
              }
              username={lodash.get(
                comment,
                'user.username',
                values.DEFAULT_USERNAME,
              )}
              commentText={comment.commentText}
              commentImage={comment.commentImage}
              commentTime={`${moment(comment.time).format(values.DATE_FORMAT)}`}
            />
          ))}
        </ScrollView>
        <TextInput
          style={styles.input}
          value={this.state.commentText}
          onChangeText={this.handleCommentChange()}
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
            onPress={this.chooseFile()}
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
