import React from 'react';
import { EditorState, Modifier } from 'draft-js';
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
      console.log('onHnadleChange', textInput);
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

    if (currentEntity && contentState.getEntity(currentEntity).getType() === 'TEXTINPUT') {
      currentValues.textInput = {};
      currentValues.textInput = contentState.getEntity(currentEntity).getData();
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
        controlID: textInput.controlId,
        controlName: textInput.controlName,
        defaultVal: textInput.defaultVal,
        describeVal: textInput.describeVal,
        dataType: textInput.dataType,
        tags: textInput.tags,
        isRequired: textInput.isRequired,
        isReadOnly: textInput.isReadOnly
      })
      .getLastCreatedEntityKey();
    const text = `${textInput.controlName}: [ ${textInput.defaultVal} ]`;
    let contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selectionState,
      text,
      editorState.getCurrentInlineStyle(),
      entityKey
    );
    let newEditorState = EditorState.push(editorState, contentState, 'insert-characters');

    // 添加空格
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

    const newEditorState = EditorState.push(editorState, contentState, 'insert-character');
    onEditorStateChange(newEditorState);
  }

  render() {
    const { selectionText, textInput } = this.getCurrentValues();
    const { currentEntity } = this.state;
    const { config } = this.props;

    return (
      <TextInputComponent
        config={config}
        textInput={textInput}
        currentEntity={currentEntity}
        selectionText={selectionText}
        onChange={this.onHandleChange}
      />
    );
  }
}
