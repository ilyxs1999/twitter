import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, StyleSheet} from 'react-native';

export default class AI extends PureComponent {
  static propTypes = {
    size: PropTypes.oneOf(['small', 'large']),
    style: PropTypes.any,
    color: PropTypes.any,
  };

  static defaultProps = {
    size: 'large',
    style: {},
  };

  render() {
    const {size, style, color} = this.props;
    return (
      <ActivityIndicator
        size={size}
        style={[styles.root, style]}
        color={color}
      />
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 100,
  },
});
