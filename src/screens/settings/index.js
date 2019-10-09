import React, {PureComponent} from 'react';
import {View, Text, Touchable} from '../../components';
import {styles} from './styles';
import {Icon,ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import NavigationService from '../../services/NavigationService';
import i18n from '../../localization';
import {LANGUAGES} from "../../constants/routes"


class Settings extends PureComponent {
  static navigationOptions = {
    headerLeft: (
      <Icon name="arrow-back" onPress={() => NavigationService.pop(1)} />
    ),
  };

  handle = () => {
    NavigationService.navigate(LANGUAGES);
  };

  render() {
    return (
      <View style={styles.container}>
        <ListItem
        title={i18n.t('LANGUAGE')}
        onPress={this.handle}
        bottomDivider
        chevron
      />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.user,
});

export default connect(mapStateToProps)(Settings);
