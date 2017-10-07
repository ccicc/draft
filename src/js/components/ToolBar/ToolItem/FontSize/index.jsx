/* 
    global
    window: false
    document: false
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import {
  getSelectionCustomInlineStyle,
  toggleCustomInlineStyle
} from 'draftjs-utils';

const Option = Select.Option;

export default class FontSize extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      currentFontSize: undefined,
      defaultFontSize: undefined
    };
  }

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentFontSize: getSelectionCustomInlineStyle(
          editorState,
          ['FONTSIZE']
        ).FONTSIZE
      });
    }
  }

  componentDidMount() {
    const editorElm = document.querySelectorAll('.DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const editorStyle = window.getComputedStyle(editorElm[0]);
      const defaultFontSize = editorStyle.getPropertyValue('font-size');
      this.setState({  // eslint-disable-line
        defaultFontSize
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editorState &&
      (nextProps.editorState !== this.props.editorState)) {
      this.setState({
        currentFontSize: getSelectionCustomInlineStyle(
          nextProps.editorState,
          ['FONTSIZE']
        ).FONTSIZE
      });
    }
  }

  onToggleFontSize = (fontSize) => {
    const { editorState, onEditorStateChange } = this.props;
    const newState = toggleCustomInlineStyle(
      editorState,
      'fontSize',
      fontSize
    );
    if (newState) {
      onEditorStateChange(newState);
    }
  }

  render() {
    const { currentFontSize, defaultFontSize } = this.state;
    const { config } = this.props;
    const options = config.fontSize.options;
    let selectFontSize;
    if (currentFontSize) {
      selectFontSize = currentFontSize.substring(9);
    } else {
      selectFontSize = defaultFontSize || '14px';
    }

    return (
      <div>
        <Select
          size="small"
          defaultValue={selectFontSize}
          style={{ width: '100%', marginRight: '10px' }}
          onSelect={value => this.onToggleFontSize(value)}
        >
          {
            options.map(item => (
              <Option
                key={item}
                value={item}
              >
                {item}
              </Option>
            ))
          }
        </Select>
        {/* <Button.Group>
                    <Button
                        size="small"
                        title="增大字体"
                        onClick={this.onHandleIncrement}
                    >
                        A+
                    </Button>
                    <Button
                        size="small"
                        title="减小字体"
                        onClick={this.onHandleDecrement}
                    >
                        A-
                    </Button>
                </Button.Group> */}
      </div>
    );
  }
}
