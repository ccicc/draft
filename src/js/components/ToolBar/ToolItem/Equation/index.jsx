import React from 'react';
import PropTypes from 'prop-types';
import { Modifier, EditorState } from 'draft-js';

import EquationComponent from './EquationComponent';

export default class Equation extends React.Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired
  };

  onAddEquation = (equationData) => {
    const { editorState, onEditorStateChange } = this.props;
    let selectionState = editorState.getSelection();
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('EQUATION', 'MUTABLE', { equationData })
      .getLastCreatedEntityKey();

    let contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selectionState,
      ' ',
      editorState.getCurrentInlineStyle(),
      entityKey
    );

    let newEditorState = EditorState.push(editorState, contentState, 'insert-characters');

    // 插入空格
    selectionState = newEditorState.getSelection();
    selectionState = selectionState.merge({
      anchorOffset: selectionState.getAnchorOffset(),
      focusOffset: selectionState.getFocusOffset()
    });

    newEditorState = EditorState.acceptSelection(newEditorState, selectionState);
    contentState = Modifier.insertText(
      newEditorState.getCurrentContent(),
      selectionState,
      ' ',
      newEditorState.getCurrentInlineStyle(),
      undefined
    );
    onEditorStateChange(EditorState.push(newEditorState, contentState, 'insert-characters'));
  }

  render() {
    return (
      <EquationComponent
        onAddEquation={this.onAddEquation}
      />
    );
  }
}
