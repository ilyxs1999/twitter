import React from 'react';
import {Avatar, CheckBox, Icon} from 'react-native-elements';
import {View, Image} from 'react-native';
import {Text, Touchable} from '../components';
import {styles} from './styles';

export function Comment(props) {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentContainerDirection}>
        <View style={styles.commentAvatar}>
          <Avatar
            size="small"
            rounded
            source={{uri: props.avatar}}
            onPress={props.avatarOnPress}
          />
        </View>
        <View style={styles.commentTextContainer}>
          <Touchable onPress={props.avatarOnPress}>
            <Text style={styles.commentUsernameText}>{props.username}</Text>
          </Touchable>
          <Text>{props.commentText}</Text>
          <Text>
            `
            {props.commentImage && (
              <Image
                style={styles.image}
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
