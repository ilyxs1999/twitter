import React, {PureComponent} from 'react';
import {FlatList, Text, SafeAreaView,AsyncStorage} from 'react-native';
import {View, Touchable} from '../../components';
import {styles} from './styles';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import NavigationService from '../../services/NavigationService';



class Languages extends PureComponent {
  
  static navigationOptions = {
    headerLeft: (
      <Icon name="arrow-back"  onPress={() => NavigationService.pop(1)} />
    ),
  };
  componentWillMount () {
 
  }

  handle = (flag)=> () => {
    AsyncStorage.setItem("language",flag)

  };

  data = [
    {
      title: 'Русский',
      flag: 'ru',
    },
    {
      title: 'English',
      flag: 'en',
    },
  ];

  render() {
      
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.data}
          renderItem={({item}) => (
            <Touchable onPress={this.handle(item.flag)}>
              <Text style={styles.text}>{item.title}</Text>
              <View style={styles.separator} />
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
