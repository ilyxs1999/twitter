import React from 'react';
import {Avatar, CheckBox, Icon, Slider} from 'react-native-elements';
import {View, Image} from 'react-native';
import {Text, Button} from '../components';
import {styles} from './styles';
import {Touchable} from '../components';
import MapView, {Marker} from 'react-native-maps';
import * as lodash from 'lodash';
import * as image from '../constants/img';
import NavigationService from '../services/NavigationService';
import * as values from '../constants/values';
import moment from 'moment';
import VoicePlayer from './voicePlayer';
import {connect} from 'react-redux';
import {likePost} from '../store/actions';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    };
    this.post = this.props.post;
    this.user = this.props.user;
  }

  isLiked = () => {
    const {usersLike} = this.props.post;
    const likeIndex = usersLike.findIndex(item => {
      return item == this.props.user.id;
    });
    if (likeIndex != -1) return true;
      else return false;
  };

  navigate = (name, params) => () => {
    NavigationService.navigate(name, params);
  };

  like = () => {
    this.setState({liked: !this.state.liked});
    this.props.likePost(this.user.id, this.post.postId);
  };
  componentDidMount(){
    this.setState({liked : this.isLiked()})
  }

  render() {
    return (
      <View>
        <View style={styles.postContainer}>
          <View style={styles.postAvatar}>
            <Avatar
              size="medium"
              rounded
              source={{
                uri: lodash.get(this.post, 'user.avatarUri', image.AVATAR),
              }}
              onPress={this.navigate('Profile', {user: this.post.user})}
            />
            <Text style={styles.postUsername}>
              {lodash.get(this.post, 'user.username', values.DEFAULT_USERNAME)}
            </Text>
          </View>

          <View style={styles.postContentContainer}>
            <Text>
              {this.post.postText && <Text>{this.post.postText}</Text>}
              {this.post.image && (
                <Touchable onPress={this.props.postImageOnPress}>
                  <Image style={styles.image} source={{uri: this.post.image}} />
                </Touchable>
              )}
              {this.post.location && (
                <MapView
                  style={styles.map}
                  onPress={this.props.postLocationOnPress}
                  initialRegion={this.post.location}>
                  <Marker coordinate={this.post.location} />
                </MapView>
              )}
            </Text>
            {this.post.path && (
              <VoicePlayer
                audioRecorderPlayer={this.props.audioRecorderPlayer}
                path={this.post.path}
              />
            )}
            <View style={styles.postTimeContainer}>
              <Text style={styles.postTimeText}>{`${moment(
                this.post.time,
              ).format(values.DATE_FORMAT)}`}</Text>
              <CheckBox
                containerStyle={styles.postCheckbox}
                uncheckedIcon={
                  <Icon name="favorite-border" reverseColor="red" color="red" />
                }
                checkedIcon={
                  <Icon name="favorite" reverseColor="red" color="red" />
                }
                checked={this.state.liked}
                onPress={this.like}
              />
              <Text>{this.post.usersLike.length}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  likePost: (id, postId) => dispatch(likePost(id, postId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
