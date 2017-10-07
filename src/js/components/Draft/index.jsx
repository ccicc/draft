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
  changeDepth,
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

// 装饰器导入
import {
  linkDecorator
} from './../../decorators';


// draftEditor组件
export default class Draft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: undefined
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
      editorState: EditorState.set(editorState, { decorator: this.getCompositeDecorator() })
    });
  }

  onEditorFocus = () => {
    this.domEditor.focus();
  }

  onTab = (event) => {
    const editorState = changeDepth(this.state.editorState, event.shiftKey ? -1 : 1, 4);
    if (editorState && editorState !== this.state.editorState) {
      this.onChange(editorState);
      event.preventDefault();
    }
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

  handlePastedText = () => {
    return true;
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
          onClick={this.onEditorFocus}
        >
          <Editor
            onTab={this.onTab}
            editorState={editorState}
            onChange={this.onChange}
            customStyleMap={getCustomStyleMap()}
            blockStyleFn={blockStyleFn}
            ref={element => this.domEditor = element}
            handleKeyCommand={this.handleKeyCommand}
            handlePastedText={this.handlePastedText}
          />
        </div>
      </div>
    );
  }
}
