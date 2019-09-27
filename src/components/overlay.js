import React from 'react';
import {Overlay, Input} from 'react-native-elements';
import {View} from 'react-native';

import {Button} from '../components';

export function Alert(props) {
  return (
    <Overlay
      isVisible={props.isVisible}
      overlayStyle={{height: 200, width: 300, alignItems: 'center'}}>
      <Input value={props.value} onChangeText={props.onChangeText} />
      <View style={{flexDirection: 'row'}}>
        <Button
          onPress={props.saveFunc}
          title={'save'}
          style={{margin: 20, flex: 1}}
        />
        <Button
          onPress={props.back}
          title={'back'}
          style={{margin: 20, flex: 1}}
        />
      </View>
    </Overlay>
  );
}
