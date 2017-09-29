import React from 'react';
import { Select } from 'antd';
import { RichUtils } from 'draft-js';
import { getSelectedBlocksType } from 'draftjs-utils';

const Option = Select.Option;

export default class BlockTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBlockStyle: 'unstyled'
    };
  }

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentBlockStyle: getSelectedBlocksType(editorState)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { editorState } = nextProps;
    if (editorState && editorState !== this.props.editorState) {
      this.setState({
        currentBlockStyle: getSelectedBlocksType(editorState)
      });
    }
  }

  onToggleBlockType = (blockType) => {
    const { config, editorState, onEditorStateChange } = this.props;
    const blockTypeVal = config.block.options.find(bt => bt.type === blockType).style;
    console.log(blockTypeVal);
    const newState = RichUtils.toggleBlockType(
      editorState,
      blockTypeVal
    );
    if (newState) {
      onEditorStateChange(newState);
    }
  }

  render() {
    const { config } = this.props;
    const { currentBlockStyle } = this.state;
    const { block } = config;
    console.log(currentBlockStyle);
    const currentBlockType = block.options.find(bt => bt.style === currentBlockStyle);
    return (
      <Select
        size="small"
        style={{ width: '100%' }}
        value={currentBlockType && currentBlockType.type}
        onSelect={this.onToggleBlockType}
      >
        {
          block.options.map(item => (
            <Option
              key={item.type}
              value={item.type}
            >
              {item.type}
            </Option>
          ))
        }
      </Select>
    );
  }
}