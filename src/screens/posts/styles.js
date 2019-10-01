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
  input: {
    height: 80,
    justifyContent: 'flex-end',
    padding: 10,
  },
  sendButton: {
    height: 40,
    flex: 4,
    margin: 20,
  },
  chooseButton: {
    height: 40,
    flex: 1,
    margin: 20,
  },
  buttonGroup: {
    height: 40,
    flexDirection: 'row',
  },
  overlay : {
    flex : 1,
    alignContent : "space-between"
  },
  fullScreenImage : {
    flex : 1,
    resizeMode : "contain"
  }
});
