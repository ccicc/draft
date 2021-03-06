import React from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import { getSelectionText } from 'draftjs-utils';

import CopyComponent from './CopyComponent';

export default class Copy extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentText: ''
    };
  }

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentText: getSelectionText(editorState)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { editorState } = nextProps;
    if (editorState && editorState !== this.props.editorState) {
      this.setState({
        currentText: getSelectionText(editorState)
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

  onPasteText = (text) => {
    // 粘贴文本
    const { editorState, onEditorStateChange } = this.props;
    const selectionState = editorState.getSelection();

    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selectionState,
      text,
      editorState.getCurrentInlineStyle()
    );

    const newState = EditorState.push(editorState, contentState, 'insert-characters');
    if (newState) {
      onEditorStateChange(newState);
    }
  }

  onCutText = () => {
    // 剪切文本, 使用空字符替换选中的文本
    const { editorState, onEditorStateChange } = this.props;
    const currentText = getSelectionText(editorState);
    this.setState({
      currentText
    });
    const selectionState = editorState.getSelection();
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selectionState,
      '',
    );
    const newState = EditorState.push(editorState, contentState, 'insert-characters');
    if (newState) {
      onEditorStateChange(newState);
    }
  }

  render() {
    const { config } = this.props;
    const { currentText } = this.state;
    return (
      <CopyComponent
        config={config}
        clipText={currentText}
        onPasteText={this.onPasteText}
        onCutText={this.onCutText}
      />
    );
  }
}
