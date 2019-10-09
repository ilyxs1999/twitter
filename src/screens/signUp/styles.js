import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding : 3,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    width: 200,
  },
  formContainer: {
    alignItems: 'center',
  },
  textError: {
    fontSize: 10,
    color: 'red',
  },
});
