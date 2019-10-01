import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  
  backButton: {
    padding: 10,
  },
  backText: {
    fontSize: 18,
  },
  input: {
    height: 80,
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
    flexDirection: 'row',
  },
});
