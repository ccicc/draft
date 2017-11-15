/*

  global
  window: false
  document: false

*/ 

import React from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Popover,
  Button,
  Tabs
} from 'antd';

import {
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';

import { ColorPicker } from './../../../Common';

const TabPane = Tabs.TabPane;

export default class SelectBgColor extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      fontColor: undefined,
      bgColor: undefined,
      defaultFontColor: undefined,
      defaultBgColor: undefined,
      isVisible: false
    };
  }

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        bgColor: getSelectionCustomInlineStyle(
          editorState,
          ['bgcolor']
        ).bgcolor,
        fontColor: getSelectionCustomInlineStyle(
          editorState,
          ['color']
        ).color
      });
    }
  }

  componentDidMount() {
    const editorElm = document.querySelectorAll('.DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const editorStyle = window.getComputedStyle(editorElm[0]);
      const defaultBgColor = editorStyle.getPropertyValue('background-color');
      const defaultFontColor = editorStyle.getPropertyValue('color');
      this.setState({   // eslint-disable-line
        defaultBgColor,
        defaultFontColor
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { editorState } = this.props;
    if (nextProps.editorState &&
      (nextProps.editorState !== editorState)
    ) {
      this.setState({
        bgColor: getSelectionCustomInlineStyle(
          nextProps.editorState,
          ['bgcolor']
        ).bgcolor,
        fontColor: getSelectionCustomInlineStyle(
          nextProps.editorState,
          ['color']
        ).color
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};
    const thisState = this.state || {};
    if (
      Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length
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

  onToggleBgColor = (bgColor) => {
    const { editorState, onEditorStateChange } = this.props;
    const newState = toggleCustomInlineStyle(
      editorState,
      'bgcolor',
      bgColor
    );
    if (newState) {
      onEditorStateChange(newState);
    }
    this.setState({
      isVisible: false
    });
  }

  onToggleFontColor = (fontColor) => {
    const { editorState, onEditorStateChange } = this.props;
    const newState = toggleCustomInlineStyle(
      editorState,
      'color',
      fontColor
    );
    if (newState) {
      onEditorStateChange(newState);
    }
    this.setState({
      isVisible: false
    });
  }

  onHandleBtnClick = () => {
    this.setState((prevState) => ({
      isVisible: !prevState.isVisible
    }));
  }

  render() {
    const { config } = this.props;
    const { bgColor, defaultBgColor, fontColor, defaultFontColor, isVisible } = this.state;
    const options = config.colorPicker.options;
    const selectedBgColor = bgColor ? bgColor.substring(8) : defaultBgColor || '#f5f5f5';
    const selectedFontColor = fontColor ? fontColor.substring(6) : defaultFontColor || '#333';

    const content = (
      <Tabs
        defaultActiveKey="1"
        size="small"
      >
        <TabPane tab="字体颜色" key="1">
          <ColorPicker
            isFontColor
            fontColor={selectedFontColor}
            config={config}
            onSelectFontColor={this.onToggleFontColor}
          />
        </TabPane>
        <TabPane tab="背景颜色" key="2">
          <ColorPicker
            isBgColor
            bgColor={selectedBgColor}
            config={config}
            onSelectBgColor={this.onToggleBgColor}
          />
        </TabPane>
      </Tabs>
    );

    return (
      <Popover
        trigger="click"
        visible={isVisible}
        placement="bottom"
        content={content}
        overlayStyle={{
          width: '202px'
        }}
      >
        <Button
          size="small"
          title="颜色设置"
          style={{ width: '100%' }}
          onClick={this.onHandleBtnClick}
        >
          <i
            className={classnames({
              [`fa fa-${options.icon} fa-lg`]: true,
              iconFont: true
            })}
          />
        </Button>
      </Popover>
    );
  }
}
