import React from 'react';
import {Avatar, CheckBox, Icon} from 'react-native-elements';
import {View, Image} from 'react-native';
import {Text} from '../components';
import {styles} from './styles';
import {Touchable} from '../components';

export function Post(props) {
  return (
    <View>
      <View style={styles.postContainer}>
        <View style={styles.postAvatar}>
          <Avatar
            size="medium"
            rounded
            source={{uri: props.avatar}}
            onPress={props.avatarOnPress}
          />
          <Text style={styles.postUsername}>{props.username}</Text>
        </View>

        <View style={styles.postContentContainer}>
          <Text>{props.postText}</Text>
          <Text>
            `
            {props.postImage && (
              <Touchable onPress={props.postImageOnPress}>
                <Image style={styles.image} source={{uri: props.postImage}} />
              </Touchable>
            )}
          </Text>
          <View style={styles.postTimeContainer}>
            <Text style={styles.postTimeText}>{props.postTime}</Text>
            <CheckBox
              containerStyle={styles.postCheckbox}
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
