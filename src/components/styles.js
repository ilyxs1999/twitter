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
    marginTop: 5,
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
    height : 200,
    marginTop : 5,
    resizeMode : "contain",
    marginBottom : 5
  },
  map: {
    height: 200,
  },
  overlayContainer: {
    height: 120,
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
    padding : 5
  },
  postAvatar: {
    alignItems: 'center',
    flex: 1,
  },
  postUsername: {
    color: 'blue',
  },
  postContentContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems : "stretch"
  },
  postLikeContainer: {
    
    flexDirection : "row-reverse", marginTop : 5, alignItems : "center"
  },
  postTimeText: {
    fontSize : 10,
    color : "#919090",
    marginBottom : 5
  },
  postCheckbox: {
    padding : 0,
    margin : 0
  },
  postText : {
    marginTop :5
  }
});
