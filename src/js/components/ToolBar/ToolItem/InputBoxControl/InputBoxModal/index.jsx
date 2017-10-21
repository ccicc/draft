/* eslint-disable */ 

import React from 'react';
import eventProxy from './../../../../../customUtils/eventProxy';
import {
  Modal,
  Select,
  Button
} from 'antd';

import inputBoxHOC from './../InputBoxHOC';
import InputBoxForm from './InputBoxForm';

const Option = Select.Option;
export default class InputBoxModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInputBox: 'TextInput'
    };
  }

  onSelectChange = (val) => {
    this.setState({
      currentInputBox: val
    });
  }

  render() {
    const {
      config,
      editorState,
      onEditorStateChange,
      isVisible,
      onHiddenModal
    } = this.props;

    const { currentInputBox } = this.state;

    const WrapperInputBoxForm = inputBoxHOC(currentInputBox)(InputBoxForm);

    return (
      <Modal
        title="插入控件"
        visible={isVisible}
        onCancel={onHiddenModal}
        width={500}
        footer={null}
      >
        <div>
          <Select 
            showSearch
            value={currentInputBox}
            optionFilterProp="children"
            onChange={this.onSelectChange}
            style={{ width: '100%' }}
          >
            <Option value="TextInput">文本输入框</Option>
            <Option value="SelectionInput">下拉单选输入框</Option>
            <Option value="DateInput">日期输入框</Option>
          </Select>
        </div>
        <WrapperInputBoxForm 
          config={config}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          onHiddenModal={onHiddenModal}
        />
      </Modal>
    )
  }
}
