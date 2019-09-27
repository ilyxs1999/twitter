import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {Text, Touchable} from '../../components';
import {connect} from 'react-redux';
import {ListItem, Avatar} from 'react-native-elements';
import NavigationService from '../../services/NavigationService';
import {styles} from './styles';

class Profile extends PureComponent {
  static navigationOptions = {
    headerLeft: (
      <Touchable
        onPress={() => NavigationService.pop(1)}
        style={styles.backButton}>
        <Text style={styles.backText}>{'<  Back'}</Text>
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
          source={{uri: user.avatarUri}}
        />
        <ListItem title={user.username} bottomDivider />
        <ListItem title={user.email} bottomDivider />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.users.user,
  };
};

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
