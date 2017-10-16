/* eslint-disable */ 

import React from 'react';
import { Button } from 'antd';
import PropTypes from './index';
import { AtomicBlockUtils, RichUtils } from 'draft-js';

export default class InsertBlock extends React.Component {
  onInsertNewLine = () => {
    const { editorState, onEditorStateChange } = this.props;
    const newState = RichUtils.insertSoftNewline(editorState);
    onEditorStateChange(newState);
  }

  render() {
    return (
      <Button
        size="small"
        title="插入新的行"
        onClick={this.onInsertNewLine}
      >
        <i className="fa fa-level-down fa-lg iconFont"/>
      </Button>
    )
  }
}
