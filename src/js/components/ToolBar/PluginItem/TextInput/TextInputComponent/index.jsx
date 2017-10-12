/* eslint-disable */

import React from 'react';
import {
  Button
} from 'antd';

import TextInputModal from './TextInputModal';

export default class TextInputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: {
        controlId: 'TextInput',
        controlName: '',
        defaultVal: '',
        describeVal: '',
        dataType: '',
        fontColor: '',
        tags: []
      },
      selectionText: '',
      isVisible: false
    }
  }

  onAddTextInput = () => {
    const { textInput, selectionText } = this.props;
    this.setState({
      isVisible: true,
      textInput,
      selectionText
    });
  }

  onModalConfirm = (err, changeFields) => {
    if (err) return false;
    console.log(changeFields);
    this.setState({
      isVisible: false
    });
  }

  onModalCancel = () => {
    this.setState({
      isVisible: false
    });
  }

  render() {
    const { isVisible, textInput } = this.state;
    return (
      <div>
        <Button
          type="primary"
          onClick={this.onAddTextInput}
        >
          文本输入控件
        </Button>
        <TextInputModal
          {...textInput}
          isVisible={isVisible}
          onModalConfirm={this.onModalConfirm}
          onModalCancel={this.onModalCancel}
        />
      </div>
    )
  }
}
