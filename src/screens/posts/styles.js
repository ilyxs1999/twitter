import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  headerIcon : {
    padding : 5
  },
  input: {
    height: 80,
    justifyContent: 'flex-end',
    padding: 10,
  },
  recorder : {
    height: 40,
    alignSelf :"center",
  },
  location : {
    flex : 1,
    height: 40,
  },
  sendButton: {
    flex  : 5,
    height: 40,
  },
  
  chooseButton: {
    flex : 1,
    height : 40
  },
  buttonGroup: {
    height: 40,
    flexDirection: 'row',
    justifyContent : "space-between",
    marginBottom : 5
  },
  tooltip : {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
  },
  overlay : {
    flex : 1,
    alignContent : "space-between"
  },
  fullScreenImage : {
    flex : 1,
    resizeMode : "contain"
  },
  fullScreenMap : {
    flex :1
  }
});
