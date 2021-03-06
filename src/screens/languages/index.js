import React, {PureComponent} from 'react';
import {FlatList, SafeAreaView,AsyncStorage} from 'react-native';
import { Touchable,Text} from '../../components';
import {styles} from './styles';
import {Icon, Divider} from 'react-native-elements';
import {connect} from 'react-redux';
import NavigationService from '../../services/NavigationService';
import {languages}  from "../../constants/languages"
import i18n from '../../localization'


class Languages extends PureComponent {
  
  static navigationOptions = {
    headerLeft: (
      <Icon name="arrow-back"  onPress={() => NavigationService.reset("Posts")} />
    ),
  };

  handle = (flag)=> () => {
    i18n.locale = flag
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={languages}
          renderItem={({item}) => (
            <Touchable onPress={this.handle(item.flag)}>
              <Text style={styles.text}>{item.title}</Text>
              <Divider/>
            </Touchable>
          )}
          keyExtractor={item => item.flag}
        />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.user,
});


export default connect(
  mapStateToProps
)(Languages);
