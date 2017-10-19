/* eslint-disable */ 

import React from 'react';
import eventProxy from './../../../../../customUtils/eventProxy';
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
        defaultVal: '未知',
        describeVal: '',
        entityColor: '#333',
        selectItems: [],
        tags: []
      }
    }
  }

  componentDidMount() {
    eventProxy.on('selectionInputEditor', this.onHandleClick);
    eventProxy.on('selectioninputDelete', this.onHandleRemove);
  }

  componentWillUnmount() {
    eventProxy.off('selectionInputEditor');
    eventProxy.off('selectionInputDelete');
  }

  onHandleClick = () => {
    const { selectionInput, selectionText } = this.props;
    this.setState({
      isVisible: true,
      selectionInput: {
        ...this.state.selectionInput,
        controlName: selectionInput && selectionInput.controlName,
        defaultVal: (selectionInput && selectionInput.defaultVal) || '未知',
        describeVal: selectionInput && selectionInput.describeVal,
        entityColor: (selectionInput && selectionInput.entityColor) || '#333',
        tags: (selectionInput && selectionInput.tags) || [],
        selectItems: (selectionInput && selectionInput.selectItems) || [],
      }
    });
  }

  onHandleConfirm = (err, changeFields) => {
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

  onHandleRemove = () => {
    const { onChange } = this.props;
    onChange('unSelectionInput');
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
          onHandleConfirm={this.onHandleConfirm}
          onHandleCancel={this.onHandleCancel}
        />
      </div>
    )
  }
}
