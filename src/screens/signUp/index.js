

import React, { PureComponent } from 'react';
import { View,Text,Touchable } from '../../components';
import {Button} from 'react-native-elements'
import {Image, StyleSheet} from 'react-native'
import * as COLORS from "../../../src/constants/colors"



export default class SignUp extends PureComponent {
    render() {
      return (
       
        <View style={styles.container}>
           <Image
          style={styles.logo}
          source={{uri : "https://upload.wikimedia.org/wikipedia/ru/thumb/9/9f/Twitter_bird_logo_2012.svg/1024px-Twitter_bird_logo_2012.svg.png"}}
        />
        <View style={styles.buttonGroup}>
          <Button
          style={styles.button}
          title="Sign in"
          />
          <Button
          style={styles.button}
          title="Sign up"
        />
       </View>
        </View>
     
        
      );
    }
  }
  const styles = StyleSheet.create({
    container : {
      flex : 1, 
      justifyContent : "center",
      alignItems : "center"
    },
    logo: {
      height : 300,
      width : 300,
      padding : 10,
      margin : 10,
     
    },
    buttonGroup : {
     width : 300,
    },
    button :{
      padding : 10
    }
    
  });