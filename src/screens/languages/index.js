import React, {PureComponent} from 'react';
import {FlatList, SafeAreaView, AsyncStorage} from 'react-native';
import {Touchable, Text} from '../../components';
import {styles} from './styles';
import {Icon, Divider} from 'react-native-elements';
import {connect} from 'react-redux';
import NavigationService from '../../services/NavigationService';
import {languages} from '../../constants/languages';
import i18n from '../../localization';
import {setLanguage} from '../../store/language/actions';

class Languages extends PureComponent {
  static navigationOptions = {
    headerLeft: (
      <Icon
        name="arrow-back"
        onPress={() => NavigationService.reset('Posts')}
      />
    ),
  };

  handle = flag => () => {
    i18n.locale = flag;
    this.props.setLanguage(flag);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={languages}
          extraData={this.props}
          renderItem={({item}) => (
            <Touchable
              style={styles.itemContainer}
              onPress={this.handle(item.flag)}>
              {
              (this.props.language == item.flag) && (<Icon containerStyle={styles.doneIcon} name="done" />)
              }
              <Text style={styles.text}>{item.title}</Text>

              <Divider />
            </Touchable>
          )}
          keyExtractor={item => item.flag}
        />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  language: state.language.language,
});

const mapDispatchToProps = dispatch => ({
  setLanguage: flag => dispatch(setLanguage(flag)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Languages);
