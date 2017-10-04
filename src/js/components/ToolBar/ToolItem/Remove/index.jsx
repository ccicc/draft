import React from 'react';
import classnames from 'classnames';
import { Button } from 'antd';
import { EditorState, Modifier } from 'draft-js';
import { getSelectionCustomInlineStyle } from 'draftjs-utils';

export default class Remove extends React.Component {
  removeAllInlineStyles = (editorState) => {
    const { config } = this.props;
    let contentState = editorState.getCurrentContent();
    const buildInStyles = config.remove.options.buildInStyles;
    const customStyles = config.remove.options.customStyles;
    console.log(buildInStyles);
    buildInStyles.forEach(style => {
      contentState = Modifier.removeInlineStyle(
        contentState,
        editorState.getSelection(),
        style
      );
    });

    /* eslint-disable */ 
    const getCustomStyles = getSelectionCustomInlineStyle(editorState, customStyles);
    for (let [key, val] of Object.entries(getCustomStyles)) {
      if (val) {
        contentState = Modifier.removeInlineStyle(
          contentState,
          editorState.getSelection(),
          val
        )
      }
    }
    return EditorState.push(editorState, contentState, 'change-inline-style');
  }
  /* eslint-enable */ 

  removeInlineStyle = () => {
    const { editorState, onEditorStateChange } = this.props;
    const newState = this.removeAllInlineStyles(editorState);
    if (newState) {
      onEditorStateChange(newState);
    }
  }

  render() {
    const { config } = this.props;
    const options = config.remove.options;
    return (
      <Button
        size="small"
        title={options.title}
        onClick={this.removeInlineStyle}
      >
        <i
          className={classnames({
            [`fa fa-${options.icon} fa-lg`]: true,
            'iconFont': true
          })}
        />
      </Button>
    );
  }
}
