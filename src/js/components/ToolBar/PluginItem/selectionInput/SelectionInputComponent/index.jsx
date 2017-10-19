/* eslint-disable */ 

import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import SelectionInputModal from './SelectionInputModal';

export default class SelectionInputComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      selectionInput: {
        controlId: 'selectionInput',
        controlName: '',
        defaultVal: '',
        describeVal: '',
        entityColor: '#333',
        selectItems: [{ val: '未知', title: '默认值' }],
        tags: []
      }
    }
  }

  onHandleClick = () => {
    const { selectionInput, selectionText } = this.props;
    this.setState({
      isVisible: true,
      selectionInput: {
        ...this.state.selectionInput,
        controlName: selectionInput && selectionInput.controlName,
        defaultVal: (selectionInput && selectionInput.defaultVal) || selectionText,
        describeVal: selectionInput && selectionInput.describeVal,
        tags: (selectionInput && selectionInput.tags) || [],
        selectItems: (selectionInput && selectionInput.selectItems) || [{ val: '未知', title: '默认值' }],
      }
    });
  }
  
  onHandleConfirm = (err, changeFields) => {
    console.log(changeFields);
    const { selectionInput } = this.state;
    const { onChange } = this.props;
    if(err)return false;
    this.setState({
      isVisible: false,
      selectionInput: {
        ...selectionInput,
        ...changeFields
      }
    });

    setTimeout(() => onChange('selectionInput', this.state.selectionInput));
  }

  onHandleCancel = () => {
    this.setState({
      isVisible: false
    });
  }

  onChangeEntityColor = (color) => {
    this.setState({
      selectionInput: {
        ...this.state.selectionInput,
        entityColor: color
      }
    })
  }

  render() {
    const { isVisible, selectionInput } = this.state;
    const { config } = this.props;

    return (
      <div>
        <Button
          type="primary"
          title="添加下拉输入框控件"
          onClick={this.onHandleClick}
        >
          下拉框单选输入框
        </Button>
        <SelectionInputModal
          config={config}
          {...selectionInput}
          isVisible={isVisible}
          onChangeEntityColor={this.onChangeEntityColor}
          onHandleConfirm={this.onHandleConfirm}
          onHandleCancel={this.onHandleCancel}
        />
      </div>
    )
  }
}
