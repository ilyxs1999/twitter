import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ViewPropTypes,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';

import * as COLORS from './../constants/colors';

class Touchable extends PureComponent {
  render() {
    const { style, onPress, rippleColor, children, activeOpacity } = this.props;

    return isCompatible('TouchableNativeFeedback') ? (
      <TouchableNativeFeedback
        {...this.props}
        background={
          rippleColor
            ? TouchableNativeFeedback.Ripple(rippleColor)
            : TouchableNativeFeedback.Ripple(COLORS.TRANSPARENT)
        }
        onPress={onPress}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    ) : (
      <TouchableOpacity
        {...this.props}
        activeOpacity={activeOpacity}
        style={style}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
}

Touchable.propTypes = {
  style: ViewPropTypes.style,
  rippleColor: PropTypes.string,
  children: PropTypes.node,
  onPress: PropTypes.func,
  activeOpacity: PropTypes.number,
};

Touchable.defaultProps = {
  activeOpacity: 0.7,
};

export default Touchable;

function isCompatible() {
  return Platform.Version >= 21;
}