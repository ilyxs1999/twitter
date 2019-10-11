import React from 'react';
import {Touchable, Button, SendPostView, Post} from '../../components';
import {Image, SafeAreaView, FlatList} from 'react-native';
import {BLACK} from '../../constants/colors';
import {Icon, Overlay} from 'react-native-elements';
import NavigationService from '../../services/NavigationService';
import {connect} from 'react-redux';
import {styles} from './styles';
import MapView, {Marker} from 'react-native-maps';
import i18n from '../../localization';
import {COMMENTS, ACCOUNT, SETTINGS} from '../../constants/routes';

class Posts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      fullScreenImage: null,
      isVisibleFullMap: false,
      fullScreenMap: null,
    };
  }

  static navigationOptions = {
    headerLeft: (
      <Icon
        containerStyle={styles.headerIcon}
        name="account-box"
        color={BLACK}
        onPress={() => NavigationService.navigate(ACCOUNT)}
      />
    ),
    headerRight: (
      <Icon
        containerStyle={styles.headerIcon}
        name="settings"
        color={BLACK}
        onPress={() => NavigationService.navigate(SETTINGS)}
      />
    ),
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

  navigate = (name, params) => () => {
    NavigationService.navigate(name, params);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          extraData={this.props}
          inverted={true}
          style={styles.card}
          onEndReached={this.loadData}
          data={this.props.posts}
          renderItem={({item}) => (
            <Touchable onPress={this.navigate(COMMENTS, {post: item})}>
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
        <SendPostView />
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
            {this.state.fullScreenMap && (
              <MapView
                style={styles.overlay}
                initialRegion={this.state.fullScreenMap}>
                <Marker coordinate={this.state.fullScreenMap} />
              </MapView>
            )}
            <Button onPress={this.closeMap} title={i18n.t('POSTS.CLOSE')} />
          </SafeAreaView>
        </Overlay>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  posts: state.posts.posts,
});

export default connect(
  mapStateToProps,
)(Posts);
