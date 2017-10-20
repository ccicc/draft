/* eslint-disable */ 

import React from 'react';
import { EditorState, Modifier } from 'draft-js';
import {
  getSelectionEntity,
  getEntityRange
} from 'draftjs-utils';

import DateInputComponent from './DateInputComponent';

export default class DateInput extends React.Component{
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
        currentEntity:getSelectionEntity(editorState)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { editorState } = nextProps;
    if (editorState && editorState !== this.props.editorState){
      this.setState({
        currentEntity:getSelectionEntity(editorState)
      })
    }
  }

  onHandleChange = (value, dateInput) => {
    if(value === 'dateInput') {
      this.addDateInput(dateInput);
    } else {
      this.removeDateInput();
    }
  }

  getCurrentValue = () => {
    const { editorState } = this.props;
    const { currentEntity } = this.state;
    const contentState = editorState.getCurrentContent();
    const currentValues = {};

    if (currentEntity && contentState.getEntity(currentEntity).getType() === 'DATEINPUT') {
      currentValues.dateInput = contentState.getEntity(currentEntity).getData();
    }
    return currentValues;
  }

  addDateInput = (dateInput) => {
    const { editorState, onEditorStateChange } = this.props;
    const { currentEntity } = this.state;
    let selectionState = editorState.getSelection();

    if (currentEntity) {
      const entityRange = editorState.getEntityRange(editorState, currentEntity);
      selectionState = selectionState.merge({
        anchorOffset: entityRange.start,
        focusOffset: entityRange.end
      });
    }

    const entityKey = editorState
      .getCurrentContent()
      .createEntity('DATEINPUT', 'IMMUTABLE', { ...dataInput })
      .getLastCreatedEntity();
    
    let contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selectionState,
      ' ',
      editorState.getCurrentInlineStyle(),
      entityKey
    );
    let newState = EditorState.push(editorState, contentState, 'insert-character');
    // 插入空格
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
    onEditorStateChange(EditorState.push(EditorState.push(newState, contentState, 'insert-character')));
  }

  removeDateInput = () => {
    const { editorState, onEditorStateChange } = this.props;
    const { currentEntity } = this.state;
    let selectionState = editorState.getSelection();

    if(currentEntity) {
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
    const newState = EditorState.push(editorState, contentStatem, 'insert-character');
    onEditorStateChange(newState);
  }

  render() {
    const { config } = this.props;
    const { currentEntity } = this.state;
    const { dateInput } = this.getCurrentValue();

    return (
      <DateInputComponent
        config={config}
        dateInput={dateInput}
        currentEntity={currentEntity}
        onChange={this.onHandleChange}
      />
    );
  }
}
