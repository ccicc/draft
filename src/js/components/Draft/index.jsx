/*
    global
    window: false
*/

import React from 'react';
import { Affix } from 'antd';
import {
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';

// import getCustomStylesMap from './../../customUtils/getCustomStylesMap';
import { getCustomStyleMap } from 'draftjs-utils';
import { createContentBlockOnePlugin } from './../../draftPlugins';

import blockStyleFn from './../../customUtils/blockStyleFn';
import config from './../../config/toolbar.config';
import initState from './initState';
import styles from './index.less';
import Toolbar from './../ToolBar';

const textInputPlugin = createContentBlockOnePlugin();

const plugins = [
  textInputPlugin,
];

export default class Draft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // const contentState = window.localStorage.getItem('contentState');
    // if (
    //     convertFromRaw(JSON.parse(contentState)).hasText()
    // ) {
    //     this.state.editorState = EditorState.createWithContent(
    //         convertFromRaw(JSON.parse(contentState))
    //     );
    // } else {
    this.state.editorState = EditorState.createWithContent(convertFromRaw(initState));
    // }
  }

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    console.log(convertToRaw(contentState));
    this.onSaveContent(contentState);
    this.setState({
      editorState
    });
  }

  onSaveContent = (contentState) => {
    window.localStorage.setItem(
      'contentState',
      JSON.stringify(convertToRaw(contentState))
    );
  }

  onHandleFocus = () => {
    this.domEditor.focus();
  }

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  render() {
    const { editorState } = this.state;
    return (
      <div
        className={styles.root}
      >
        <Affix offsetTop={64}>
          <div className={styles.toolbar}>
            <Toolbar
              config={config}
              editorState={editorState}
              onEditorStateChange={this.onChange}
              onFocusClick={this.onHandleFocus}
            />
          </div>
        </Affix>
        <div
          className={styles.editorWrapper}
          onClick={this.onHandleFocus}
        >
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            customStyleMap={getCustomStyleMap()}
            blockStyleFn={blockStyleFn}
            plugins={plugins}
            ref={element => this.domEditor = element}
          />
        </div>
      </div>
    );
  }
}
