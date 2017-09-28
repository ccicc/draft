/* eslint-disable */

import React from 'react';
import { Button } from 'antd';
import { RichUtils } from 'draft-js';
import {
  changeDepth,
  getBlockBeforeSelectedBlocj,
  getSelectedBlock,
  isListBlock
} from 'draftjs-utils';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBlock: undefined
    };
  }

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentBlock: getSelectedBlock(editorState)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { editorState } = this.props;
    if (editorState && editorState !== this.props.editorState) {
      this.setState({
        currentBlock: getSelectedBlock(editorState)
      });
    }
  }

  onToggleBlockType = (blockType) => {
    const { editorState, onEditorStateChange } = this.props;
    const newState = RichUtils.toggleBlockType(
      editorState,
      blockType
    );
    if (newState) {
      onEditorStateChange(newState);
    }
  }

  adjustDepth = (adjustment) => {
    const { onEditorStateChange, editorState } = this.props;
    const newState = changeDepth(
      editorState,
      adjustment,
      5
    );
    if (newState) {
      onEditorStateChange(newState);
    }
  }

  onHandleChange = (value) => {
    if (value === 'unordered') {
      this.onToggleBlockType('unordered-list-item');
    } else if (value === 'ordered') {
      this.onToggleBlockType('ordered-list-item');
    } else if(value === 'indent') {
      this.adjustDepth(1);
    } else if(value === 'outdent'){
      this.adjustDepth(-1);
    }
  }

  render() {
    const { config, editorState, onEditorStateChange } = this.props;
    const { currentBlock } = this.state;
    const { list } = config.list.component;
    let listType;
    if (currentBlock.getType() === 'unordered-list-item'){
      listType = 'unordered';
    } else if (currentBlock.getType() === 'ordered-list-item') {
      listType = 'ordered';
    }


    return (
      <div
        title="头绪列表"
      >
      
      </div>
    )
  }
}
