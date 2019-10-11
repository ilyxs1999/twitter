import React from 'react';
import {Avatar} from 'react-native-elements';
import {View, Image} from 'react-native';
import {Text, Touchable} from '../components';
import {styles} from './styles';
import {get} from 'lodash';
import {AVATAR} from '../constants/img';
import {DEFAULT_USERNAME, DATE_FORMAT} from '../constants/values';
import moment from 'moment';
import NavigationService from '../services/NavigationService';
import {PROFILE} from "../constants/routes"


export function Comment({comment}) {
  console.log(comment)
  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentAvatar}>
        <Avatar
          size="small"
          rounded
          source={{uri: get(comment, 'user.picture', AVATAR)}}
          onPress={()=> NavigationService.navigate(PROFILE, {user: comment.user})}
        />
      </View>
      <View style={styles.commentTextContainer}>
        <Touchable onPress={()=> NavigationService.navigate(PROFILE, {user: comment.user})}>
          <Text style={styles.commentUsernameText}>
            {get(comment, 'user.username', DEFAULT_USERNAME)}
          </Text>
        </Touchable>
        <Text style={styles.postTimeText}>{`${moment(comment.time).format(DATE_FORMAT)}`}</Text>
        <Text style = {{marginBottom : 5}}>{comment.commentText}</Text>
        <Text>
          {comment.commentImage && (
            <Image style={styles.image} source={{uri: comment.commentImage}} />
          )}
        </Text>
        
      </View>
    </View>
  );
}
