import React from 'react';
import {
  EditorState,
  Modifier
} from 'draft-js';
import {
  getSelectionText,
  getSelectionEntity,
  getEntityRange
} from 'draftjs-utils';
import {
  Button
} from 'antd';

export default class CustomStrikeThrough extends React.Component {
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

  onChange = () => {
    const { entityText, selectedText } = this.getCurrentValue();
    const { currentEntity } = this.state;

    if (currentEntity) {
      this.removeStrikeThrough(entityText);
    } else {
      this.addStrikeThrough(selectedText);
    }
  }

  getCurrentValue = () => {
    const { editorState } = this.props;
    const { currentEntity } = this.state;
    const contentState = editorState.getCurrentContent();
    const currentValues = {};

    if (currentEntity && contentState.getEntity(currentEntity).getType() === 'CUSTOMTHROUGH') {
      const entityRange = getEntityRange(editorState, currentEntity);
      currentValues.entityText = entityRange.text;
    }
    currentValues.selectedText = getSelectionText(editorState);
    return currentValues;
  }

  addStrikeThrough = (selectedText) => {
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
      .createEntity('CUSTOMTHROUGH', 'MUTABLE', {})
      .getLastCreatedEntityKey();

    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selectionState,
      `${selectedText}`,
      editorState.getCurrentInlineStyle(),
      entityKey
    );

    const newEditorState = EditorState.push(editorState, contentState, 'insert-characters');
    if (newEditorState) {
      onEditorStateChange(newEditorState);
    }
  }

  removeStrikeThrough = (entityText) => {
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
      entityText,
      editorState.getCurrentInlineStyle()
    );

    const newEditorState = EditorState.push(editorState, contentState, 'insert-characters');
    onEditorStateChange(newEditorState);
  }

  render() {
    const { currentEntity } = this.state;
    const { editorState } = this.props;
    const contentState = editorState.getCurrentContent();
    let type; // eslint-disable-line
    if (currentEntity && contentState.getEntity(currentEntity).getType() === 'CUSTOMTHROUGH') {
      type = 'primary';
    } else {
      type = '';
    }
    return (
      <Button
        type={type}
        size="small"
        onClick={this.onChange}
      >
        <i className="fa fa-strikethrough fa-lg" />
      </Button>
    );
  }
}
