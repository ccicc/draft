import React from 'react';
import { EditorState, Modifier } from 'draft-js';
import {
  getSelectionText,
  getSelectionEntity,
  getEntityRange
} from 'draftjs-utils';
import SelectionInputComponent from './SelectionInputComponent';

export default class SelectionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEntity: undefined
    };
  }

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentEntity: getSelectionEntity(editorState)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { editorState } = nextProps;
    if (editorState && editorState !== this.props.editorState) {
      this.setState({
        currentEntity: getSelectionEntity(editorState)
      });
    }
  }

  onHandleChange = (value, selectionInput) => {
    if (value === 'selectionInput') {
      this.addSelectionInput(selectionInput);
    } else {
      this.removeTextInput();
    }
  }

  getCurrentValue = () => {
    const { editorState } = this.props;
    const { currentEntity } = this.state;
    const contentState = editorState.getCurrentContent();
    const currentValues = {};

    if (currentEntity && contentState.getEntity(currentEntity).getType() === 'SELECTIONINPUT') {
      currentValues.selectionInput = contentState.getEntity(currentEntity).getData();
    }
    currentValues.selectionText = getSelectionText(editorState);
    return currentValues;
  }

  addSelectionInput = (selectionInput) => {
    const { editorState, onEditorStateChange } = this.props;
    const { currentEntity } = this.state;
    let selectionState = editorState.getSelection();

    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      selectionState = selectionState.merge({
        anchorOffset: entityRange.start,
        focusOffset: entityRange.end
      });
    }
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('SELECTIONINPUT', 'IMMUTABLE', { ...selectionInput })
      .getLastCreatedEntityKey();

    const text = `${selectionInput.controlName} : [ ${selectionInput.defaultVal} ]`;
    let contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selectionState,
      text,
      editorState.getCurrentInlineStyle(),
      entityKey
    );
    let newState = EditorState.push(editorState, contentState, 'insert-characters');

    const newSelectionState = newState.getSelection();
    selectionState = selectionState.merge({
      anchorOffset: newSelectionState.getAnchorOffset(),
      focusOffset: newSelectionState.getFocusOffset()
    });
    newState = EditorState.acceptSelection(newState, selectionState);
    contentState = Modifier.replaceText(
      newState.getCurrentContent(),
      selectionState,
      ' ',
      newState.getCurrentInlineStyle(),
      undefined
    );
    onEditorStateChange(EditorState.push(newState, contentState, 'insert-cahracter'));
  }

  removeTextInput = () => {
    // 移除创建的实体组件
    const { editorState, onEditorStateChange } = this.props;
    const { currentEntity } = this.state;
    let selectionState = editorState.getSelection();

    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      selectionState = selectionState.merge({
        anchorOffset: entityRange.start,
        focusOffset: entityRange.end
      });
    }
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selectionState,
      ' ',
      editorState.getCurrentInlineStyle()
    );
    const newState = EditorState.push(editorState, contentState, 'insert-character');
    onEditorStateChange(newState);
  }

  render() {
    const { currentEntity } = this.state;
    const { config } = this.props;
    const { selectionInput, selectionText } = this.getCurrentValue();
    return (
      <SelectionInputComponent
        config={config}
        selectionInput={selectionInput}
        selectionText={selectionText}
        currentEntity={currentEntity}
        onChange={this.onHandleChange}
      />
    );
  }
}
