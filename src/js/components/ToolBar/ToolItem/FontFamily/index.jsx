/* 
    global
    window: false
    document: false
*/

import React from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import {
  getSelectionCustomInlineStyle,
  toggleCustomInlineStyle
} from 'draftjs-utils';

const Option = Select.Option;

export default class FontFamily extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      currentFontFamily: undefined,
      defaultFontFamily: undefined
    };
  }

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentFontFamily: getSelectionCustomInlineStyle(
          editorState,
          ['FONTFAMILY']
        ).FONTFAMILY,
      });
    }
  }

  componentDidMount() {
    const editorElm = document.querySelectorAll('.DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const editorStyle = window.getComputedStyle(editorElm[0]);
      const defaultFontFamily = editorStyle.getPropertyValue('font-family');
      this.setState({     // eslint-disable-line
        defaultFontFamily
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.editorState &&
      this.props.editorState !== nextProps.editorState
    ) {
      this.setState({
        currentFontFamily: getSelectionCustomInlineStyle(
          nextProps.editorState,
          ['FONTFAMILY']
        ).FONTFAMILY,
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

  onToggleFontFamily = (fontFamily) => {
    const { editorState, onEditorStateChange } = this.props;
    const newState = toggleCustomInlineStyle(
      editorState,
      'fontFamily',
      fontFamily
    );
    if (newState) {
      onEditorStateChange(newState);
    }
  }

  render() {
    const { currentFontFamily, defaultFontFamily } = this.state;
    const { config, editorState } = this.props;
    const selectFontFamily = currentFontFamily ? currentFontFamily.substring(11) : defaultFontFamily; // eslint-disable-line
    const options = config.fontFamily.options;
    return (
      <Select
        size="small"
        editorState={editorState}
        value={selectFontFamily}
        onSelect={value => this.onToggleFontFamily(value)}
        style={{ width: '100%' }}
      >
        {
          options.map(fontFamily => (
            <Option
              key={fontFamily}
              value={fontFamily}
            >
              {fontFamily}
            </Option>
          ))
        }
      </Select>
    );
  }
}
