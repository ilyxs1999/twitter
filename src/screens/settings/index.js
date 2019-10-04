import React, {PureComponent} from 'react';
import {Platform} from 'react-native';
import {View, Text, Button,Touchable} from '../../components';
import {styles} from './styles';
import {CheckBox, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {getUsers} from '../../store/actions';
import NavigationService from '../../services/NavigationService';
import i18n from '../../localization';


class Settings extends PureComponent {
  
  static navigationOptions = {
    headerLeft: (
      <Touchable
        onPress={() => NavigationService.pop(1)}
        style={styles.backButton}>
        <Text style={styles.backText}>{i18n.t('BACK_BUTTON')}</Text>
      </Touchable>
    ),
  };

  handle = () => {
  }

  render() {
    return (
      <View style={styles.container}>
          <Button onPress={this.handle}/>
      </View>
    );
  }
  
}
const mapStateToProps = state => ({
  user: state.users.user,
})

const mapDispatchToProps = dispatch => ({
  getUsers : () => dispatch(getUsers())
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);