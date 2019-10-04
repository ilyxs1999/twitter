import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {Text, Touchable} from '../../components';
import {connect} from 'react-redux';
import {ListItem, Avatar} from 'react-native-elements';
import NavigationService from '../../services/NavigationService';
import {styles} from './styles';
import * as values from '../../constants/values';
import {get} from 'lodash';
import {AVATAR} from '../../constants/img'
import {DEFAULT_USERNAME, DEFAULT_EMAIL} from '../../constants/values'
import i18n from '../../localization';


class Profile extends PureComponent {
  static navigationOptions = {
    headerLeft: (
      <Touchable
        onPress={() => NavigationService.pop(1)}
        style={styles.backButton}>
        <Text style={styles.backText}>{i18n.t('BACK_BUTTON')}</Text>
      </Touchable>
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
          source={{uri: get(user,'avatarUri',AVATAR)}}
        />
        <ListItem title={get(user,'username',DEFAULT_USERNAME)} bottomDivider />
        <ListItem title={get(user,'email',DEFAULT_EMAIL)} bottomDivider />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
});

export default connect(mapStateToProps)(Profile);
