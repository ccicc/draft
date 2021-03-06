import React from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import {
  Modal,
  Select
} from 'antd';

import inputBoxHOC from './../InputBoxHOC';
import InputBoxForm from './InputBoxForm';
import eventProxy from './../../../../../customUtils/eventProxy';

const Option = Select.Option;
export default class InputBoxModal extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onHiddenModal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentInputBox: 'TextInput'
    };
  }

  componentDidMount() {
    const { onHandleClick } = this.props;
    const inputBoxArr = [
      'dateInputEditor',
      'selectionInputEditor',
      'textInputEditor',
      'selectionMultipleEditor',
      'checkBoxInputEditor',
      'radioBoxInputEditor'
    ];
    inputBoxArr.forEach(item => {
      eventProxy.on(item, (val) => {
        onHandleClick();
        this.onSelectChange(val);
      });
    });
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
    for (const key in nextState) {
      if (nextState.hasOwnProperty(key) && !is(thisState[key], nextState[key])) {
        return true;
      }
    }
    return false;
  }

  componentWillUnmount() {
    eventProxy.off('dataInputEditor');
    eventProxy.off('selectionInputEditor');
    eventProxy.off('textInputEditor');
    eventProxy.off('selectionMultipleEditor');
    eventProxy.off('checkBoxInputEditor');
    eventProxy.off('radioBoxInputEditor');
  }

  onSelectChange = (val) => {
    if (val) {
      this.setState({
        currentInputBox: val
      });
    }
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
        width={520}
        footer={null}
      >
        <Select
          showSearch
          value={currentInputBox}
          optionFilterProp="children"
          onChange={this.onSelectChange}
          style={{ width: '50%' }}
        >
          <Option value="TextInput">文本输入框</Option>
          <Option value="DateInput">日期输入框</Option>
          <Option value="SelectionInput">下拉单选输入框</Option>
          <Option value="SelectionMultipleInput">下拉多选输入框</Option>
          <Option value="CheckBoxInput">复选框</Option>
          <Option value="RadioBoxInput">单选框</Option>
        </Select>
        <WrapperInputBoxForm
          config={config}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          onHiddenModal={onHiddenModal}
        />
      </Modal>
    );
  }
}
