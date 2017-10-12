/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js'
import {
  getSelectionText,
  getSelectionEntity,
  getEntityRange
} from 'draftjs-utils';
import TextInputComponent from './TextInputComponent';

export default class TextInput extends React.Component {
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

  onHandleChange = (value, textInput) => {
    if (value === 'textInput') {
      this.addTextInput(textInput);
    } else {
      this.removeTextInput();
    }
  }

  getCurrentValues = () => {
    const { editorState } = this.props;
    const { currentEntity } = this.state;
    const contentState = editorState.getCurrentContent();
    const currentValues = {};

    if (currentEntity && contentState.getEntity(currentEntity).getType() === 'TextInput') {
      currentValues.textInput = {};
      const entityRange = getEntityRange(editorState, currentEntity);
      currentValues.textInput.controlID = contentState.getEntity(currentEntity).getData().controlID;
      currentValues.textInput.controlName = contentState.getEntity(currentEntity).getData().controlName;
      currentValues.textInput.defaultVal = contentState.getEntity(currentEntity).getData().defaultVal;
      currentValues.textInput.describeVal = contentState.getEntity(currentEntity).getData().describeVal;
      currentValues.textInput.dataType = contentState.getEntity(currentEntity).getData().dataType;
      currentValues.textInput.fontColor = contentState.getEntity(currentEntity).getData().fontColor;
      currentValues.TextInput.tags = contentState.getEntity(currentEntity).getData().tages;
    }

    currentValues.selectionText = getSelectionText(editorState);
    return currentValues;
  }

  addTextInput = (textInput) => {
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
      .createEntity('TEXTINPUT', 'IMMUTABLE', {
        controlID: textInput.controlID,
        controlName: TextInput.controlName,
        defaultVal: textInput.defaultVal,
        describeVal: TextInput.describeVal,
        dataType: textInput.dataType,
        fontColor: TextInput.fontColor,
        tags: textInput.tags
      })
      .getLastCreatedEntityKey();
    const text = `${textInput.controlName}: [${textInput.defaultVal}]`;
    let contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selectionState,
      text,
      editorState.getCurrentInlineStyle(),
      entityKey
    );
    let newEditorState = EditorState.push(editorState, contentState, 'insert-characters');
    selectionState = newEditorState.getSelection();
    selectionState = selectionState.merge({
      anchorOffset: selectionState.getAnchorOffset() + text.length,
      focusOffset: selectionState.getFocusOffset() + text.length
    });
    newEditorState = EditorState.acceptSelection(newEditorState, selectionState);
    contentState = Modifier.replaceText(
      newEditorState.getCurrentContent(),
      selectionState,
      ' ',
      newEditorState.getCurrentInlineStyle(),
      undefined
    );
    onEditorStateChange(EditorState.push(newEditorState, contentState, 'insert-characters'));
  }

  removeTextInput = () => {
    const { editorState, onEditorStateChange } = this.props;
    const { currentEntity } = this.props;

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
      entityRange.text,
      editorState.getCurrentInlineStyle(),
      undefined
    );
    const newEditorState = EditorState.push(editorState, contentState, 'insert-characters');
    onEditorStateChange(newEditorState);
  }

  render() {
    const { selectionText, textInput } = this.getCurrentValues();
    const { currentEntity } = this.state;
    const { config } = this.props;;

    return (
      <TextInputComponent
        config={config}
        textInput={textInput}
        currentEntity={currentEntity}
        selectionText={selectionText}
        onChange={this.onHandleChange}
      />
    )
  }
}
