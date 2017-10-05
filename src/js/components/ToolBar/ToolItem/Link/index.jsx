/* eslint-disable */

import React from 'react';
import { RichUtils, EditorState, Modifier, convertFromRaw } from 'draft-js';
import {
  getSelectionText,
  getSelectionEntity,
  getEntityRange
} from 'draftjs-utils';
import LinkComponent from './LinkComponent';

export default class Link extends React.Component {
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

  onHandleChange = (action, link) => {
    if (action === 'link') {
      this.addLink(link);
    } else {
      this.removeLink();
    }
  }

  getCurrentValues = () => {
    const { editorState } = this.props;
    const { currentEntity } = this.state;

    const contentState = editorState.getCurrentContent();
    const currentValues = {};

    if (currentEntity && (contentState.getEntity(currentEntity).getType() === 'LINK')) {
      currentValues.link = {};
      const entityRange = getEntityRange(editorState, currentEntity);
      currentValues.link.url = contentState.getEntity(currentEntity).getData().url;
      currentValues.link.target = contentState.getEntity(currentEntity).getData().target;
      currentValues.link.title = entityRange.title;
    }
    currentValues.selectionText = getSelectionText(editorState);
    return currentValues;
  }


  addLink = (link) => {
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
      .createEntity('LINK', 'MUTABLE', { url: link.url, target: link.target })
      .getLastCreatedEntityKey();

    let contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selectionState,
      `${link.title}`,
      editorState.getCurrentInlineStyle(),
      entityKey
    );

    let newEditorState = EditorState.push(editorState, contentState, 'insert-characters');

    // 在链接后插入空格
    selectionState = newEditorState.getSelection().merge({
      anchorOffset: selectionState.getAnchorOffset() + link.title.length,
      focusOffset: selectionState.getFocusOffset() + link.title.length
    });

    newEditorState = EditorState.acceptSelection(newEditorState, selectionState);
    contentState = Modifier.insertText(
      newEditorState.getCurrentContent(),
      selectionState,
      ' ',
      newEditorState.getCurrentInlineStyle(),
      undefined
    );

    newEditorState = EditorState.push(newEditorState, contentState, 'insert-characters');
    onEditorStateChange(newEditorState);
  }

  removeLink = () => {
    const { editorState, onEditorStateChange } = this.props;
    const { currentEntity } = this.state;
    let selectionState = editorState.getSelection();

    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      selectionState = selectionState.merge({
        anchorOffset: entityRange.start,
        focusOffset: entityRange.end
      });

      const newEditorState = RichUtils.toggleLink(editorState, selectionState, null);
      onEditorStateChange(newEditorState);
    }
  }

  render() {
    const { config } = this.props;
    const { link, selectionText } = this.getCurrentValues();

    return (
      <LinkComponent
        config={config}
        onHandleChange={this.onHandleChange}
        currentState={{
          link,
          selectionText
        }}
      />
    );
  }
}
