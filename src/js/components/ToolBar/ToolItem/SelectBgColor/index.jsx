import React from 'react';
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
  constructor(props) {
    super(props);
    this.state = {
      fontColor: undefined,
      bgColor: undefined,
      defaultFontColor: undefined,
      defaultBgColor: undefined
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

  /* eslint-disable */ 
  comonentDidMount() {
    const editorElm = document.querySelectorAll('.DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const editorStyle = window.getComputedStyle(editorElm[0]);
      const defaultBgColor = editorStyle.getPropertyValue('background-color');
      const defaultFontColor = editorStyle.getPropertyValue('color');
      this.setState({
        defaultBgColor,
        defaultFontColor
      });
    }
  }

  /* eslint-enable */ 
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
  }

  onToggleFontColor = (fontColor) => {
    console.log(fontColor);
    const { editorState, onEditorStateChange } = this.props;
    const newState = toggleCustomInlineStyle(
      editorState,
      'color',
      fontColor
    );

    if (newState) {
      onEditorStateChange(newState);
    }
  }

  render() {
    const { config } = this.props;
    const { bgColor, defaultBgColor, fontColor, defaultFontColor } = this.state;

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
        >
          <i className="fa fa-paint-brush fa-lg" />
        </Button>
      </Popover>
    );
  }
}
