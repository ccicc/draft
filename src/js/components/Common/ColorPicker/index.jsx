import React from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import { BlockPicker, GithubPicker } from 'react-color';

export default class ColorPicker extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    isFontColor: PropTypes.bool,
    isBgColor: PropTypes.bool,
    onSelectFontColor: PropTypes.func,
    onSelectBgColor: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      fontColor: '333',
      entityFontColor: '#333',
      bgColor: '#fff',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};
    const thisState = this.state || {};

    if (
      Object.keys(thisProps).length !== Object.keys(nextProps) ||
      Object.keys(thisState).length !== Object.keys(nextState)
    ) {
      return true;
    }
    for (const key in nextProps) {
      if (nextProps.hasOwnProperty(key) && !is(thisProps[key], nextProps[key])) {
        return true;
      }
    }
    for (const key in nextState) {
      if (nextState.hasOwnProperty(key) && !is(thisState[key], nextState[key])) {
        return true;
      }
    }
    return false;
  }

  // 更改实体组件字体颜色
  onChangeEntityColor = (color) => {
    this.setState({
      entityFontColor: color.hex
    });

    this.props.onChange(color.hex);
  }

  // 更改编辑器字体颜色
  onChangeFontColor = (color) => {
    this.setState({
      fontColor: color.hex
    });
    this.props.onSelectFontColor(color.hex);
  }

  // 更改编辑器字体背景颜色
  onChangeBgColor = (color) => {
    this.setState({
      bgColor: color.hex
    });

    this.props.onSelectBgColor(color.hex);
  }

  render() {
    const { config, isFontColor, isBgColor } = this.props;
    const colors = config.colorPicker.options;
    let colorPicker;

    const bgColorPicker = (
      <BlockPicker
        triangle="hide"
        color={this.props.bgColor}
        colors={colors.bgColors}
        onChangeComplete={this.onChangeBgColor}
      />
    );

    const fontColorPicker = (
      <BlockPicker
        triangle="hide"
        color={this.props.fontColor}
        colors={colors.fontColors}
        onChangeComplete={this.onChangeFontColor}
      />
    );

    const entityColorPicker = (
      <div>
        <GithubPicker
          width="100%"
          color={this.props.entityColor}
          colors={colors.entityColors}
          onChangeComplete={this.onChangeEntityColor}
        />
      </div>
    );

    if (isBgColor) {
      colorPicker = bgColorPicker;
    } else if (isFontColor) {
      colorPicker = fontColorPicker;
    } else {
      colorPicker = entityColorPicker;
    }

    return colorPicker;
  }
}
