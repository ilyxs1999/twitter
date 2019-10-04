import React from 'react';
import {Overlay, Input} from 'react-native-elements';
import {View} from 'react-native';
import {styles} from './styles';
import {Button} from '../components';
import i18n from '../localization';


export function Alert(props) {
  return (
    <Overlay isVisible={props.isVisible} overlayStyle={styles.overlayContainer}>
      <Input value={props.value} onChangeText={props.onChangeText} />
      <View style={styles.overlayDirection}>
        <Button
          onPress={props.saveFunc}
          title={i18n.t('LOGIN.SAVE')}
          style={styles.overlayButton}
        />
        <Button
          onPress={props.back}
          title={i18n.t('LOGIN.BACK')}
          style={styles.overlayButton}
        />
      </View>
    </Overlay>
  );
}
