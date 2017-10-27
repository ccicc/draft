import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import {
  getSelectionText,
  getSelectionEntity,
  getEntityRange
} from 'draftjs-utils';

import eventProxy from './../../../../../customUtils/eventProxy';

export default function inputBoxHOC(currInputBox) {
  return function (Component) {         // eslint-disable-line
    return class extends React.Component {
      static propTypes = {
        config: PropTypes.object.isRequired,
        editorState: PropTypes.object.isRequired,
        onEditorStateChange: PropTypes.func.isRequired,
        onHiddenModal: PropTypes.func.isRequired
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

      componentDidMount() {
        eventProxy.on('dateInputDelete', () => this.onHandleChange());
        eventProxy.on('selectionInputDelete', () => this.onHandleChange());
        eventProxy.on('textInputDelete', () => this.onHandleChange());
        eventProxy.on('selectionMultipleDelete', () => this.onHandleChange());
        eventProxy.on('checkBoxInputDelete', () => this.onHandleChange());
      }

      componentWillReceiveProps(nextProps) {
        const { editorState } = nextProps;
        if (editorState && (editorState !== this.props.editorState)) {
          this.setState({
            currentEntity: getSelectionEntity(editorState)
          });
        }
      }

      componentWillUnmount() {
        eventProxy.off('dateInputDelete');
        eventProxy.off('selectionInputDelete');
        eventProxy.off('textInputDelete');
        eventProxy.off('selectionMultipleDelete');
        eventProxy.off('checkBoxInputDelete');
      }

      onHandleChange = (value, entityData) => {
        if (value === currInputBox) {
          this.addInputBoxEntity(entityData);
        } else {
          this.removeInputBoxEntity();
        }
      }

      getCurrentValue = () => {
        // 获取当前焦点的实体数据
        const { editorState } = this.props;
        const { currentEntity } = this.state;
        const contentState = editorState.getCurrentContent();
        const currentValues = {};
        if (
          currentEntity &&
          contentState.getEntity(currentEntity).getType() === currInputBox.toUpperCase()
        ) {
          currentValues.entityData = contentState.getEntity(currentEntity).getData();
        }
        currentValues.selectionText = getSelectionText(editorState);
        return currentValues;
      }

      addInputBoxEntity = (entityData) => {
        // 向编辑器中添加输入框实体
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
          .createEntity(currInputBox.toUpperCase(), 'IMMUTABLE', { ...entityData })
          .getLastCreatedEntityKey();

        const placeholderText = `${entityData.controlName || ''}: [ ${entityData.defaultVal || ''} ]`;
        let contentState = Modifier.replaceText(
          editorState.getCurrentContent(),
          selectionState,
          placeholderText,
          editorState.getCurrentInlineStyle(),
          entityKey
        );
        let newState = EditorState.push(editorState, contentState, 'insert-character');
        // 添加空格
        selectionState = selectionState.merge({
          anchorOffset: newState.getSelection().getAnchorOffset(),
          focusOffset: newState.getSelection().getFocusOffset()
        });
        newState = EditorState.acceptSelection(newState, selectionState);
        contentState = Modifier.replaceText(
          newState.getCurrentContent(),
          selectionState,
          ' ',
          editorState.getCurrentInlineStyle(),
          undefined
        );
        onEditorStateChange(EditorState.push(newState, contentState, 'insert-character'));
      }

      removeInputBoxEntity = () => {
        // 从编辑器中删除输入框实体
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
          editorState.getCurrentInlineStyle(),
          undefined
        );
        onEditorStateChange(EditorState.push(editorState, contentState, 'insert-character'));
      }

      render() {
        const { config, onHiddenModal } = this.props;
        const { selectionText, entityData } = this.getCurrentValue();
        const controlID = (entityData && entityData.controlID) || currInputBox;
        return (
          <Component
            entityData={entityData}
            controlID={controlID}
            config={config}
            selectionText={selectionText}
            onChange={this.onHandleChange}
            onHiddenModal={onHiddenModal}
          />
        );
      }
    };
  };
}
