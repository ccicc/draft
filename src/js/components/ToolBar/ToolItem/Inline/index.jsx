import React from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import classnames from 'classnames';
import { getSelectionInlineStyle } from 'draftjs-utils';
import { RichUtils, EditorState, Modifier } from 'draft-js';
import CustomBtn from './../CustomBtn';

import CustomStrikeThrough from './CustomStrikeThrough';
import PageBreak from './PageBreak';

export default class InlineTool extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentStyles: {}
    };
  }

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentStyles: this.changeKey(getSelectionInlineStyle(editorState))
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editorState &&
      nextProps.editorState !== this.props.editorState
    ) {
      this.setState({
        currentStyles: this.changeKey(getSelectionInlineStyle(nextProps.editorState))
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};
    const thisState = this.state || {};

    if (
      Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length
    ) {
      return true;
    }

    for (const key in nextProps) {
      if (nextProps.hasOwnProperty(key) && !is(thisProps[key], nextProps[key])) {
        return true;
      }
    }

    for (const key in thisProps) {
      if (nextState.hasOwnProperty(key) && !is(nextState[key], nextState[key])) {
        return true;
      }
    }
    return false;
  }

  onAddInlineStyle = (style) => {
    const { editorState, onEditorStateChange } = this.props;
    const newStyle = style.toUpperCase();
    let newState = RichUtils.toggleInlineStyle(
      editorState,
      newStyle
    );
    if (style === 'subscript' || style === 'superscript') {
      const removeStyle = style === 'subscript' ? 'SUPERSCRIPT' : 'SUBSCRIPT';
      const contentState = Modifier.removeInlineStyle(
        newState.getCurrentContent(),
        newState.getSelection(),
        removeStyle
      );
      newState = EditorState.push(newState, contentState, 'change-inline-style');
    }

    if (newState) {
      onEditorStateChange(newState);
    }
  }

  onRemoveInlineStyle = (style) => {
    const { editorState, onEditorStateChange } = this.props;
    const removeStyle = style === 'monospace' ? 'CODE' : style.toUpperCase();
    const contentState = Modifier.removeInlineStyle(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      removeStyle
    );
    const newState = EditorState.push(editorState, contentState, 'change-inline-style');
    onEditorStateChange(newState);
  }

  onToggleInlineStyle = (style) => {
    const { currentStyles } = this.state;
    if (currentStyles[style]) {
      this.onAddInlineStyle(style);
    } else {
      this.onRemoveInlineStyle(style);
    }
  }

  changeKey = (style) => {
    if (style) {
      const st = {};
      for (const [key, val] of Object.entries(style)) {   // eslint-disable-line
        st[key.toLowerCase()] = val;
      }
      return st;
    }
    return undefined;
  }

  render() {
    const { currentStyles } = this.state;
    const { config, editorState, onEditorStateChange } = this.props;
    const options = config.inline.options;

    return (
      <Button.Group
        style={{ width: '100%' }}
      >
        {
          options.map(item => (
            <CustomBtn
              key={item.type}
              title={item.title}
              type={item.type}
              onToggleStyle={this.onToggleInlineStyle}
              currentStyles={currentStyles}
            >
              <i
                className={classnames({
                  [`fa fa-${item.icon} fa-lg`]: true,
                  'iconFont': true
                })}
              />
            </CustomBtn>
          ))
        }
        <CustomStrikeThrough
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
        <PageBreak
          config={config}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
      </Button.Group>
    );
  }
}
