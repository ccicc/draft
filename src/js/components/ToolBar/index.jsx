import React from 'react';
import PropTypes from 'prop-types';
import EditorPanel from './EditorPanel';

export default class ToolBar extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired
  };

  render() {
    const {
      editorState,
      onEditorStateChange,
      config,
    } = this.props;

    return (
      <EditorPanel
        config={config}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    );
  }
}
