import React from 'react';
import { Affix } from 'antd';
import {
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  CompositeDecorator
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import {
  getCustomStyleMap,
  extractInlineStyle
} from 'draftjs-utils';

import styles from './index.less';

// 自定义块级样式
import blockStyleFn from './../../customUtils/blockStyleFn';
// toolbar配置
import config from './../../config/toolbar.config';
// editorState初始化
import initState from './initState';
// toolbar组件
import Toolbar from './../ToolBar';

// 装饰器
import {
  linkDecorator
} from './../../decorators';


// draftEditor组件
export default class Draft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: this.createEditorState(this.getCompositeDecorator())
    };
  }

  componentWillMount() {
    this.compositeDecorator = this.getCompositeDecorator();
    const editorState = this.createEditorState(this.compositeDecorator);
    extractInlineStyle(editorState);
    this.setState({
      editorState
    });
  }

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    console.log(convertToRaw(contentState));
    this.setState({
      editorState
    });
  }

  onHandleFocus = () => {
    this.domEditor.focus();
  }

  getCompositeDecorator = () => {
    const decorators = [linkDecorator()];
    return new CompositeDecorator(decorators);
  }

  createEditorState = (compositeDecorator) => {
    const contentState = convertFromRaw(initState);
    const editorState = EditorState.createWithContent(contentState, compositeDecorator);
    return editorState;
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
            ref={element => this.domEditor = element}
          />
        </div>
      </div>
    );
  }
}
