import React, { PureComponent } from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

export const ARIAL = 'Arial';


class Text extends PureComponent {
  static propTypes = {
    style: RNText.propTypes.style,
  };

  static defaultProps = {
    fontFamily: ARIAL,
    fontWeight: 'light',
  };

  render() {
    const { style, fontWeight, fontFamily, ...props } = this.props;
    const fontOptions = {};

    const s = StyleSheet.flatten([
      {
        backgroundColor: 'transparent',
      },
      fontOptions,
      style,
    ]);

    return <RNText style={s} {...props} />;
  }
}

export default Text;