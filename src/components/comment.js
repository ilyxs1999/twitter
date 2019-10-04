import React from 'react';
import {Avatar, CheckBox, Icon} from 'react-native-elements';
import {View, Image} from 'react-native';
import {Text, Touchable} from '../components';

export function Comment(props) {
  return (
    <View
      style={{borderBottomColor: '#6a717d', borderBottomWidth: 1, padding: 5}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, alignItems: 'center', margin: 10}}>
          <Avatar
            size="small"
            rounded
            source={{uri: props.avatar}}
            onPress={props.avatarOnPress}
          />
        </View>
        <View style={{flex: 6, justifyContent: 'space-between'}}>
          <Touchable onPress={props.avatarOnPress}>
            <Text style={{color: 'blue'}}>{props.username}</Text>
          </Touchable>
          <Text>{props.commentText}</Text>
          <Text>
            `
            {props.commentImage && (
              <Image
                style={{width: 200, height: 200}}
                source={{uri: props.commentImage}}
              />
            )}
          </Text>
          <Text>{props.commentTime}</Text>
        </View>
      </View>
    </View>
  );
}
