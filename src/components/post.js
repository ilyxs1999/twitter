import React from 'react';
import {Avatar, CheckBox, Icon} from 'react-native-elements';
import {View, Image} from 'react-native';
import {Text} from '../components';
import {styles} from './styles';
import {Touchable} from '../components';
import MapView, {Marker} from 'react-native-maps';
import {get} from 'lodash';
import {AVATAR} from '../constants/img';
import NavigationService from '../services/NavigationService';
import  {DEFAULT_USERNAME, DATE_FORMAT} from '../constants/values';
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
  }

  componentDidMount(){
    this.setState({liked : this.isLiked()})
  }

  isLiked = () => {
    const usersLike = get(this.props,'post.usersLike', []);
    const likeIndex = usersLike.findIndex(item => {
      return item == this.props.user.id;
    });
    return likeIndex != -1
  };

  navigate = (name, params) => () => {
    NavigationService.navigate(name, params);
  };

  like = () => {
    this.setState({liked: !this.state.liked});
    this.props.likePost(this.props.user.id, this.props.post.postId);
  };

  render() {
    return (
      <View>
        <View style={styles.postContainer}>
          <View style={styles.postAvatar}>
            <Avatar
              size="medium"
              rounded
              source={{
                uri: get(this.props.post, 'user.avatarUri', AVATAR),
              }}
              onPress={this.navigate('Profile', {user: this.props.post.user})}
            />
            <Text style={styles.postUsername}>
              {get(this.props.post, 'user.username', DEFAULT_USERNAME)}
            </Text>
          </View>

          <View style={styles.postContentContainer}>
            <Text>
              {this.props.post.postText && <Text>{get(this.props.post,'postText',"indefinite")}</Text>}
              {this.props.post.image && (
                <Touchable onPress={this.props.postImageOnPress}>
                  <Image style={styles.image} source={{uri: this.props.post.image}} />
                </Touchable>
              )}
              {this.props.post.location && (
                <MapView
                  style={styles.map}
                  onPress={this.props.postLocationOnPress}
                  initialRegion={this.props.post.location}>
                  <Marker coordinate={this.props.post.location} />
                </MapView>
              )}
            </Text>
            {this.props.post.path && (
              <VoicePlayer
                audioRecorderPlayer={this.props.audioRecorderPlayer}
                path={this.props.post.path}
              />
            )}
            <View style={styles.postTimeContainer}>
              <Text style={styles.postTimeText}>{`${moment(
                this.props.post.time,
              ).format(DATE_FORMAT)}`}</Text>
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
              <Text>{this.props.post.usersLike.length}</Text>
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
