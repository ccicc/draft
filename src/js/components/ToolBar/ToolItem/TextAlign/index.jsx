import React from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import {
  getSelectedBlocksMetadata,
  setBlockData
} from 'draftjs-utils';

import './index.less';

export default class TextAlign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTextAlignment: undefined
    };
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
      newState = setBlockData(editorState, { 'text-align': null });
    }
    if (newState) {
      onEditorStateChange(newState);
    }
  }

  render() {
    const { config } = this.props;
    const { currentTextAlignment } = this.state;
    const options = config.textAlign.options;

    return (
      <Button.Group>
        {
          options.map(item => (
            <Button
              key={item.type}
              type={currentTextAlignment === item.type ? 'primary' : 'default'}
              size="small"
              title={item.title}
              onClick={() => this.onSetBlockAlignmentData(item.type)}
            >
              <i
                className={classnames({
                  [`fa fa-${item.icon} fa-lg`]: true,
                  'iconFont': true
                })}
              />
            </Button>
          ))
        }
      </Button.Group>
    );
  }
}
