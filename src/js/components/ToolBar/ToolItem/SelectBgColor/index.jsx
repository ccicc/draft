import React from 'react';
import {
  Popover,
  Button
} from 'antd';
import {
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';

import SelectColor from './../../../TextInput/EditorModal/SelectColor';

export default class SelectBgColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: undefined,
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
        ).bgcolor
      });
    }
  }

  /* eslint-disable */ 
  comonentDidMount() {
    const editorElm = document.querySelectorAll('.DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const editorStyle = window.getComputedStyle(editorElm[0]);
      const defaultBgColor = editorStyle.getPropertyValue('background-color');
      this.setState({
        defaultBgColor
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
        ).bgcolor
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

  render() {
    const { config } = this.props;
    const { bgColor, defaultBgColor } = this.state;
    let selectColor;
    if (bgColor) {
      console.log(bgColor);
      selectColor = bgColor.substring(8);
    } else {
      selectColor = defaultBgColor || '#fff';
    }

    const btnStyle = {
      width: '30%',
      backgroundColor: `${selectColor}`
    };
    return (
      <Popover
        trigger="click"
        placement="bottom"
        content={<SelectColor
          isToolbar
          bgColor={selectColor}
          config={config}
          onSelectBgColor={this.onToggleBgColor}
        />}
      >
        <Button
          size="small"
          title="字体背景"
          style={btnStyle}
        />
      </Popover>
    );
  }
}
