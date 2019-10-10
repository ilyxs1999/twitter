import React from 'react';
import {Overlay, Input} from 'react-native-elements';
import {View} from 'react-native';
import {styles} from './styles';
import {Button} from '../components';
import i18n from '../localization';
import {connect} from 'react-redux';


export default class Alert extends React.Component {
  constructor ( props) {
    super(props)
    this.state = {
      text : ""
    }
  }

  handleChangeText = text => {
    this.setState({text});
  };

  render() {
    const {isVisible,value,onChangeText,saveFunc,back} = this.props
    return (
      <Overlay
        isVisible={isVisible}
        overlayStyle={styles.overlayContainer}>
        <View style={styles.overlayContainer}>
          <Input value={this.state.text} onChangeText={this.handleChangeText} />
          <View style={styles.overlayDirection}>
            <Button
              onPress={saveFunc}
              title={i18n.t('LOGIN.SAVE')}
              style={styles.overlayButton}
            />
            <Button
              onPress={back}
              title={i18n.t('LOGIN.BACK')}
              style={styles.overlayButton}
            />
          </View>
        </View>
      </Overlay>
    );
  }
}
