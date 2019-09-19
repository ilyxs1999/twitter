import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text as RNText, Platform, StyleSheet } from 'react-native';

export const NOTEWORTHY = 'Noteworthy';
export const SANFRANCISCO = 'Sanfranciso';
export const INCONSOLATA = 'Inconsolata';

export const fontFamilies = {
  [NOTEWORTHY]: {
    bold: 'Noteworthy-Bold',
    regular: 'Noteworthy-Light',
  },
  [SANFRANCISCO]: {
    bold: 'SFCompactText-Semibold',
    regular: 'SFCompactText-Regular',
  },
  [INCONSOLATA]: {
    bold: 'Inconsolata-Regular',
    regular: 'Inconsolata-Regular',
  },
};

class Text extends PureComponent {
  static propTypes = {
    fontFamily: PropTypes.oneOf([NOTEWORTHY, SANFRANCISCO, INCONSOLATA]),
    fontWeight: PropTypes.oneOf(['light', 'bold']),
    style: RNText.propTypes.style,
  };

  static defaultProps = {
    fontFamily: NOTEWORTHY,
    fontWeight: 'light',
  };

  render() {
    const { style, fontWeight, fontFamily, ...props } = this.props;
    const isAndroid = Platform.OS === 'android';
    const fontOptions = {};

    switch (fontWeight) {
      case 'bold':
        fontOptions.fontWeight = !isAndroid ? '600' : null;
        fontOptions.fontFamily = fontFamilies[fontFamily].bold;
        break;

      default:
        fontOptions.fontWeight = !isAndroid ? '300' : null;
        fontOptions.fontFamily = fontFamilies[fontFamily].regular;
    }

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