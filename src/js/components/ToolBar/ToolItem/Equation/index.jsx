/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import katex from 'katex';
import { AtomicBlockUtils } from 'draft-js';

import EquationComponent from './EquationComponent';

export default class Equation extends React.Component {
  constructor(props) {
    super(props);
  }

  onAddEquation = (equationData) => {
    const { editorState, onEditorStateChange } = this.props;
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('EQUATION', 'IMMUABLE', equationData)
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
    )
  }
}
