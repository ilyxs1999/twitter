import React from 'react';
import {Overlay, Input} from 'react-native-elements';
import {View} from 'react-native';
import {styles} from './styles';
import {Button} from '../components';
import i18n from '../localization';

export default class Alert extends React.Component {
  render() {
    const {isVisible,value,onChangeText,saveFunc,back} = this.props
    return (
      <Overlay
        isVisible={isVisible}
        overlayStyle={styles.overlayContainer}>
        <View style={styles.overlayContainer}>
          <Input value={value} onChangeText={onChangeText} />
          <View style={styles.overlayDirection}>
            <Button
              onPress={saveFunc}
              title={i18n.t('LOGIN.SAVE')}
              style={styles.overlayButton}
            />
            <Button
              onPress={back}
              title={i18n.t('LOGIN.BACK')}
              style={styles.overlayButton}
            />
          </View>
        </View>
      </Overlay>
    );
  }
}
