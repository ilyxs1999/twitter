import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {ListItem, Avatar, Icon} from 'react-native-elements';
import NavigationService from '../../services/NavigationService';
import {styles} from './styles';
import {get} from 'lodash';
import {AVATAR} from '../../constants/img'
import {DEFAULT_USERNAME, DEFAULT_EMAIL} from '../../constants/values'


class Profile extends PureComponent {
  static navigationOptions = {
    headerLeft: (
      <Icon name="arrow-back"  onPress={() => NavigationService.pop(1)} />
    ),
  };
  render() {
    const user = this.props.navigation.getParam('user');
    return (
      <View>
        <Avatar
          containerStyle={styles.avatar}
          size={200}
          rounded
          source={{uri: get(user,'picture',AVATAR)}}
        />
        <ListItem title={get(user,'username',DEFAULT_USERNAME)} bottomDivider />
        <ListItem title={get(user,'email',DEFAULT_EMAIL)} bottomDivider />
        <ListItem title={get(user,'gender',DEFAULT_USERNAME)} bottomDivider />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Profile);
