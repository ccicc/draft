import React from 'react';
import PropTypes from 'prop-types';
import { AtomicBlockUtils } from 'draft-js';
import ImageComponent from './ImageComponent';

export default class Image extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired,
  };

  onAddImage = (imageData) => {
    const { editorState, onEditorStateChange } = this.props;
    console.log(imageData);
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('IMAGE', 'IMMUTABLE', imageData)
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
    return (
      <ImageComponent
        config={config}
        onAddImage={this.onAddImage}
      />
    );
  }
}
