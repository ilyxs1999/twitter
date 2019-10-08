import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  commentContainer: {
    borderBottomColor: '#6a717d',
    borderBottomWidth: 1,
    padding: 5,
    flexDirection: 'row',
  },
  commentAvatar: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  commentTextContainer: {
    flex: 6,
    justifyContent: 'space-between',
  },
  slider : {
    flex: 1, padding: 10
  },
  voicePlayerContainer : {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
  },
  commentUsernameText: {
    color: 'blue',
  },
  image: {
    margin : 10,
    width: 200,
    height: 200,
  },
  map: {
    width: 200,
    height: 200,
  },
  overlayContainer: {
    height: 200,
    width: 300,
    alignItems: 'center',
  },
  overlayDirection: {
    flexDirection: 'row',
  },
  overlayButton: {
    margin: 20,
    flex: 1,
  },
  postContainer: {
    flexDirection: 'row',
    borderBottomColor: '#6a717d',
    borderBottomWidth: 1,
  },
  postAvatar: {
    alignItems: 'center',
    flex: 1,
    padding: 5,
  },
  postUsername: {
    marginTop: 10,
    color: 'blue',
  },
  postContentContainer: {
    flex: 4,
    margin: 5,
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  postTimeContainer: {
    flexDirection: 'row',
  },
  postTimeText: {
    flex: 4,
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
  postCheckbox: {
    flex: 1,
    padding: 0,
    margin: 0,
    alignSelf: 'flex-end',
  },
});
