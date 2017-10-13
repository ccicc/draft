/* eslint-disable */

import React from 'react';
import {
  Button
} from 'antd';
import eventProxy from 'customUtils/eventProxy';
import TextInputModal from './TextInputModal';

export default class TextInputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: {
        controlId: '',
        controlName: '',
        defaultVal: '',
        describeVal: '',
        dataType: '',
        tags: []
      },
      selectionText: '',
      isVisible: false
    }
  }

  componentDidMount() {
    eventProxy.on('textInputEditor', this.onAddTextInputClick);
    eventProxy.on('textInputDelete', this.onRemoveTextInput);
  }

  componentWillUnMount() {
    eventProxy.off('textInputEditor');
    eventProxy.off('textInputDelete');
  }

  onAddTextInputClick = () => {
    const { textInput, selectionText } = this.props;
    this.setState({
      isVisible: true,
      textInput: {
        ...this.state.textInput,
        controlId: 'TextInput',
        controlName: textInput && textInput.controlName,
        defaultVal: (textInput && textInput.defaultVal) || selectionText,
        describeVal: textInput && textInput.describeVal,
        dataType: textInput && textInput.dataType || '普通文本',
        tags: textInput && textInput.tags
      }
    });
  }

  onRemoveTextInput = () => {
    const { onChange } = this.props;
    onChange('unTextInput');
  }

  onModalConfirm = (err, changeFields) => {
    const { textInput } = this.state;
    const { onChange } = this.props;
    if (err) return false;
    this.setState({
      isVisible: false,
      textInput: {
        ...textInput,
        ...changeFields,
      }
    });
    setTimeout(() => onChange('textInput', this.state.textInput), 0);
  }

  onModalCancel = () => {
    this.setState({
      isVisible: false
    });
  }

  render() {
    const { isVisible, textInput } = this.state;
    const { config } = this.props;
    return (
      <div>
        <Button
          type="primary"
          onClick={this.onAddTextInputClick}
        >
          文本输入控件
        </Button>
        <TextInputModal
          {...textInput}
          config={config}
          isVisible={isVisible}
          entityColor={textInput.fontColor}
          onModalConfirm={this.onModalConfirm}
          onModalCancel={this.onModalCancel}
        />
      </div>
    )
  }
}
