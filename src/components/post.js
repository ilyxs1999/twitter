import React from 'react';
import {Avatar, CheckBox, Icon} from 'react-native-elements';
import {View, Image} from 'react-native';
import {Text} from '../components';

import {Button} from '../components';

export function Post(props) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: '#6a717d',
          borderBottomWidth: 1,
        }}>
        <View style={{alignItems: 'center', flex: 1, padding: 5}}>
          <Avatar
            size="medium"
            rounded
            source={{uri: props.avatar}}
            onPress={props.avatarOnPress}
          />
          <Text style={{marginTop: 10}}>{props.username}</Text>
        </View>

        <View
          style={{
            flex: 4,
            margin: 5,
            padding: 5,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Text>{props.postText}</Text>
          <Text>
            `
            {props.postImage && (
              <Image
                style={{width: 200, height: 200}}
                source={{uri: props.postImage}}
              />
            )}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 4, textAlign: 'center', alignSelf: 'flex-end'}}>
              {props.postTime}
            </Text>
            <CheckBox
              containerStyle={{
                flex: 1,
                padding: 0,
                margin: 0,
                alignSelf: 'flex-end',
              }}
              uncheckedIcon={
                <Icon name="favorite-border" reverseColor="red" color="red" />
              }
              checkedIcon={
                <Icon name="favorite" reverseColor="red" color="red" />
              }
              checked={true}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
