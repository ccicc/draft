import React from 'react';
import PropTypes from 'prop-types';
import { AtomicBlockUtils } from 'draft-js';

import EquationComponent from './EquationComponent';

export default class Equation extends React.Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired
  };

  onAddEquation = (equationData) => {
    const { editorState, onEditorStateChange } = this.props;
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('EQUATION', 'IMMUTABLE', { equationData })
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
    return (
      <EquationComponent
        onAddEquation={this.onAddEquation}
      />
    );
  }
}
