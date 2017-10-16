import React from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { AtomicBlockUtils } from 'draft-js';

export default class PageBreak extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired
  };
  onAddPageBreak = () => {
    const { editorState, onEditorStateChange } = this.props;
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('PAGEBREAK', 'MUTABLE', {})
      .getLastCreatedEntityKey();
    const newState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );
    if (newState) {
      onEditorStateChange(newState);
    }
  }

  render() {
    const { config } = this.props;
    const options = config.pageBreak.options;
    return (
      <Button
        size="small"
        type="default"
        title={options.title}
        onClick={this.onAddPageBreak}
      >
        <i
          className={classnames({
            [`fa fa-${options.icon} fa-lg`]: true,
            iconFont: true
          })}
        />
      </Button>
    );
  }
}
