import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import {
  getSelectionText,
  getSelectionEntity,
  getEntityRange
} from 'draftjs-utils';
import PostilComponent from './PostilComponent';

export default class Postil extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired
  };

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

  onHandleChange = (value, postil) => {
    if (value === 'postil') {
      this.addPostilEntity(postil);
    } else {
      this.removePostil(postil);
    }
  }

  getCurrentEntityData = () => {
    // 获取选中的文本或实体的数据
    const { editorState } = this.props;
    const { currentEntity } = this.state;
    const contentState = editorState.getCurrentContent();
    const currentEntityData = {};

    if (currentEntity && (contentState.getEntity(currentEntity).getType() === 'POSTIL')) {
      currentEntityData.postil = {};
      const entityRange = getEntityRange(editorState, currentEntity);
      currentEntityData.postil.postilText = contentState.getEntity(currentEntity).getData().postilText; // eslint-disable-line
      currentEntityData.postil.entityText = entityRange.text;
    }
    currentEntityData.selectedText = getSelectionText(editorState);

    return currentEntityData;
  }

  addPostilEntity = (postil) => {
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
      .createEntity('POSTIL', 'MUTABLE', { postilText: postil.postilText, entityText: postil.entityText })
      .getLastCreatedEntityKey();

    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selectionState,
      `${postil.entityText}`,
      editorState.getCurrentInlineStyle(),
      entityKey
    );

    const newState = EditorState.push(editorState, contentState, 'insert-characters');
    onEditorStateChange(newState);
  }

  removePostil = (postil) => {
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
      postil.entityText,
      editorState.getCurrentInlineStyle()
    );
    const newEditorState = EditorState.push(editorState, contentState, 'insert-characters');
    onEditorStateChange(newEditorState);
  }

  render() {
    const { selectedText, postil } = this.getCurrentEntityData();
    const { currentEntity } = this.state;
    const { config } = this.props;

    return (
      <PostilComponent
        config={config}
        postil={postil}
        currentEntity={currentEntity}
        selectedText={selectedText}
        onChange={this.onHandleChange}
      />
    );
  }
}
