import React, {PureComponent} from 'react';
import {View, Button} from '../../components';
import NavigationService from '../../services/NavigationService';
import {Image, StyleSheet} from 'react-native';
import {styles} from './styles'
export default class Auth extends PureComponent {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/ru/thumb/9/9f/Twitter_bird_logo_2012.svg/1024px-Twitter_bird_logo_2012.svg.png',
          }}
        />
        <View>
          <Button
            onPress={() => {
              NavigationService.navigate('SignIn', {});
            }}
            style={styles.button}
            title="Sign in"
          />
          <Button
            onPress={() => {
              NavigationService.navigate('SignUp', {});
            }}
            style={styles.button}
            title="Sign up"
          />
          
        </View>
      </View>
    );
  }
}
