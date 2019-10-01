import React from 'react';
import {Overlay, Input} from 'react-native-elements';
import {View} from 'react-native';
import {styles} from './styles';
import {Button} from '../components';

export function Alert(props) {
  return (
    <Overlay isVisible={props.isVisible} overlayStyle={styles.overlayContainer}>
      <Input value={props.value} onChangeText={props.onChangeText} />
      <View style={styles.overlayDirection}>
        <Button
          onPress={props.saveFunc}
          title={'save'}
          style={styles.overlayButton}
        />
        <Button
          onPress={props.back}
          title={'back'}
          style={styles.overlayButton}
        />
      </View>
    </Overlay>
  );
}
