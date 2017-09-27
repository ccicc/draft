import React from 'react';
import { TwitterPicker, BlockPicker } from 'react-color';

export default class SelectColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontColor: '#333',
      bgColor: '#fff'
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props || nextState !== this.state) return true;
    return false;
  }

  onHandleChangeFontColor = (color) => {
    this.setState({
      fontColor: color.hex
    });
    this.props.onSelectFontColor(color.hex);
  }

  onHandleChangeBgColor = (color) => {
    this.setState({
      bgColor: color.hex
    });
    this.props.onSelectBgColor(color.hex);
  };

  render() {
    const { config, isToolbar } = this.props; // eslint-disable-line
    const colors = config.colorPicker.options;

    const bgColorPicker = (   // eslint-disable-line
      <BlockPicker
        width={170}
        color={this.props.bgColor}
        colors={colors}
        onChangeComplete={this.onHandleChangeBgColor}
      />
    );

    const fontColorPicker = (
      <div style={{ marginTop: '10px' }}>
        <TwitterPicker
          width="100%"
          color={this.props.fontColor}
          onChangeComplete={this.onHandleChangeFontColor}
          colors={colors}
        />
      </div>
    );

    return (
      <div>
        {
          isToolbar ? bgColorPicker : fontColorPicker
        }
      </div>
    );
  }
}
