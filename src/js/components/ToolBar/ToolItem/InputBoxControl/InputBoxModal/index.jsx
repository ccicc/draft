import React from 'react';
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
    eventProxy.on('dateInputEditor', (val) => {
      onHandleClick();
      this.onSelectChange(val);
    });
    eventProxy.on('selectionInputEditor', (val) => {
      onHandleClick();
      this.onSelectChange(val);
    });
    eventProxy.on('textInputEditor', (val) => {
      onHandleClick();
      this.onSelectChange(val);
    });
  }

  componentWillUnmount() {
    eventProxy.off('dataInputEditor');
    eventProxy.off('selectionInputEditor');
    eventProxy.off('textInputEditor');
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
    );
  }
}
