import React from 'react';
import { RichUtils, EditorState, Modifier } from 'draft-js';
import {
  changeDepth,
  getSelectedBlocksMetadata,
  // setBlockData,
  getSelectedBlock,
} from 'draftjs-utils';

import ListTypeComponent from './ListTypeComponent';

import './index.less';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBlock: undefined,
      currentBlockData: undefined
    };
  }

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentBlock: getSelectedBlock(editorState),
        currentBlockData: getSelectedBlocksMetadata(editorState).get('list-style-type')
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { editorState } = nextProps;
    if (editorState && editorState !== this.props.editorState) {
      this.setState({
        currentBlock: getSelectedBlock(editorState),
        currentBlockData: getSelectedBlocksMetadata(editorState).get('list-style-type')
      });
    }
  }

  /**
   * 
   * 更改contentBlock类型为列表类型并自定义list-style-type
   * 
   * */ 
  onToggleBlockType = (blockType, blockData) => {
    const { editorState, onEditorStateChange } = this.props;
    const { currentBlockData } = this.state;
    console.log(blockType);
    let newState = RichUtils.toggleBlockType(
      editorState,
      blockType
    );

    if (currentBlockData !== blockData) {
      this.setState({
        currentBlockData: blockData
      });
      const contentState = Modifier.setBlockData(
        newState.getCurrentContent(),
        newState.getSelection(),
        { 'list-style-type': blockData }
      );
      newState = EditorState.push(newState, contentState, 'change-block-data');
    } else if (currentBlockData === blockData) {
      const contentState = Modifier.setBlockData(
        newState.getCurrentContent(),
        newState.getSelection(),
        { 'list-style-type': undefined }
      );
      newState = EditorState.push(newState, contentState, 'change-block-data');
    }

    if (newState) {
      onEditorStateChange(newState);
    }
  }

  onHandleChange = (value, blockData) => {
    if (value === 'unordered') {
      this.onToggleBlockType('unordered-list-item', blockData);
    } else if (value === 'ordered') {
      this.onToggleBlockType('ordered-list-item', blockData);
    } else if (value === 'indent') {
      this.adjustDepth(1);
    } else if (value === 'outdent') {
      this.adjustDepth(-1);
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

  render() {
    const { config } = this.props;
    const { currentBlock } = this.state;
    const ordered = config.list.options.ordered;
    const unordered = config.list.options.unordered;

    let listType;  // eslint-disable-line
    if (currentBlock.getType() === 'unordered-list-item') {
      listType = 'unordered';
    }

    if (currentBlock.getType() === 'ordered-list-item') {
      listType = 'ordered';
    }

    return (
      <div>
        <ListTypeComponent
          listType={ordered}
          onChange={this.onHandleChange}
        />
        <ListTypeComponent
          listType={unordered}
          onChange={this.onHandleChange}
        />
      </div>
    );
  }
}
