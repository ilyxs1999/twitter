import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, StyleSheet, ViewPropTypes } from 'react-native';

export default class FullScrollView extends PureComponent {
  static propTypes = {
    contentContainerStyle: ViewPropTypes.style,
    children: PropTypes.node,
    scrollToEnd: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      height: 0,
    };
  }

  render() {
    const { contentContainerStyle, ...props } = this.props;
    return (
      <View style={[styles.root, contentContainerStyle]} onLayout={this.handleLayout}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{ minHeight: this.state.height || '100%' }}
          {...props}>
          {this.props.children}
        </ScrollView>
      </View>
    );
  }

  handleLayout = e => {
    if (e.nativeEvent && e.nativeEvent.layout && e.nativeEvent.layout.width) {
      this.setState({
        height: e.nativeEvent.layout.height,
      });
    }
  };
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});