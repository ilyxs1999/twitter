import React, {PureComponent} from 'react';
import {View, Text} from '../../components';
import { styles } from './styles'


export default class Settings extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}
