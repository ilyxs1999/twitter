import React, { PureComponent, } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ViewPropTypes, } from 'react-native';


import { Text, Touchable, } from '../components';

import * as COLORS from '../constants/colors';


export default class Button extends PureComponent {

  static propTypes = {
    icon: PropTypes.string,
    size: PropTypes.number,
    style: ViewPropTypes.style,
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    titleStyle: Text.propTypes.style,
    titleWeight: PropTypes.string,
  }

  render() {
    const { title, style, titleStyle, titleWeight,  } = this.props;

    return (
      <Touchable

        style={[styles.container, style,]}
        onPress={this.props.onPress}
      >
        {
          title ?
            <Text fontWeight={titleWeight} style={[styles.text , titleStyle,]}>
              {this.props.title}
            </Text>
            :
            null
        }
      </Touchable>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    minHeight: 30,
    opacity: 0.9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.ACCENT,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 15,
  },
  margin: {
    marginRight: 8,
  },
});