/* eslint-disable */

import React from 'react';
import { TwitterPicker } from 'react-color';

export default class SelectColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontColor: '#333'
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props || nextState !== this.state) return true;
    return false;
  }

  onHandleChangeColor = (color) => {
    this.setState({
      fontColor: color.hex
    });
    this.props.onSelectFontColor(color.hex);
  }

  render() {
    const { config } = this.props;
    const colors = config.colorPicker.options;
    return (
      <div style={{ marginTop: '10px' }}>
        <TwitterPicker
          width="100%"
          color={this.props.fontColor}
          onChangeComplete={this.onHandleChangeColor}
          colors={colors}
        />
      </div>
    )
  }
}
