import React from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { RichUtils } from 'draft-js';
import {
  changeDepth,
  getBlockBeforeSelectedBlock,
  isListBlock,
  getSelectedBlock,
} from 'draftjs-utils';

import ListTypeComponent from './ListTypeComponent';

import './index.less';

export default class List extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentBlock: undefined,
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
    const { editorState } = nextProps;
    if (editorState && editorState !== this.props.editorState) {
      this.setState({
        currentBlock: getSelectedBlock(editorState)
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

  onHandleChange = (value) => {
    if (value === 'unordered') {
      this.onToggleBlockType('unordered-list-item');
    } else if (value === 'ordered') {
      this.onToggleBlockType('ordered-list-item');
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
      4
    );
    if (newState) {
      onEditorStateChange(newState);
    }
  }

  isIndentDisable = () => {
    const { editorState } = this.props;
    const { currentBlock } = this.state;

    const prevBlock = getBlockBeforeSelectedBlock(editorState);
    if (
      !prevBlock || !isListBlock(currentBlock) ||
      prevBlock.getType() !== currentBlock.getType() ||
      prevBlock.getDepth() < currentBlock.getDepth()
    ) {
      return true;
    }
    return false;
  }

  isOutdentDisable = () => {
    const { currentBlock } = this.state;
    if (
      !currentBlock ||
      !isListBlock(currentBlock) ||
      currentBlock.getDepth() <= 0
    ) return true;
  }

  render() {
    const { config } = this.props;
    const { currentBlock } = this.state;
    const items = config.list.options;

    let listType;
    if (currentBlock.getType() === 'unordered-list-item') {
      listType = 'unordered';
    }
    if (currentBlock.getType() === 'ordered-list-item') {
      listType = 'ordered';
    }

    const isIndent = this.isIndentDisable();
    const isOutdent = this.isOutdentDisable();

    return (
      <Button.Group>
        {
          items.map((item, index) => {
            return (
              <ListTypeComponent
                listType={listType}
                isIndent={isIndent}
                isOutdent={isOutdent}
                key={index}
                type={item.type}
                title={item.title}
                icon={item.icon}
                onChange={this.onHandleChange}
              />
            );
          })
        }
      </Button.Group>
    );
  }
}
