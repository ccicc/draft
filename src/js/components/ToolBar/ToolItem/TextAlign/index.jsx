/* eslint-disable */
import React from 'react';
import { Button } from 'antd';
import {
  getSelectedBlocksMetadata,
  setBlockData
} from 'draftjs-utils';

export default class TextAlign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTextAlignment: undefined
    }
  }

  componentWillReceiveProps(nextProps) {
    const { editorState } = nextProps;
    if (editorState && editorState !== this.props.editorState) {
      this.setState({
        currentTextAlignment: getSelectedBlocksMetadata(editorState).get('text-align')
      });
    }
  }

  onSetBlockAlignmentData = (value) => {
    const { editorState, onEditorStateChange } = this.props;
    const { currentTextAlignment } = this.state;
    let newState;
    if (currentTextAlignment !== value) {
      newState = setBlockData(editorState, { 'text-align': value });
    } else {
      newState = setBlockData(editorState, {'text-align': null});
    }
    if (newState) {
      onEditorStateChange(newState);
    }
  }

  render() {
    const { config, editorState } = this.props;
    const { currentTextAlignment } = this.state;
    const options = config.textAlign.options;
    console.log(this.state.currentTextAlignment);
    return (
      <Button.Group>
        {
          options.map(item => (
            <Button
              key={item.type}
              ghost={currentTextAlignment === item.type}
              type={currentTextAlignment === item.type ? 'primary' : 'default'}
              size="small"
              title={item.title}
              onClick={() => this.onSetBlockAlignmentData(item.type)}
            >
              <i className={`fa fa-${item.icon} fa-lg`} />
            </Button>
          ))
        }
      </Button.Group>
    )
  }
}
