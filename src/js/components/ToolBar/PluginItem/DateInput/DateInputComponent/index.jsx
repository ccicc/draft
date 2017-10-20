/* eslint-disable */ 

import React from 'react';
import {
  Button
} from 'antd';

import DateInputModal from './DateInputModal';

export default class DateInputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateInput: {
        controlId: '',
        controlName: '',
        defaultVal: '',
        describeVal: '',
        tags: [],
        entityColor: '',
        dateFormat: '',
        isRequired: false,
        isReadOnly: false
      },
      isVisible: false
    };
  }

  onAddDateInputClick = () => {
    this.setState({
      isVisible: true
    });
  }

  onHandleConfirm = () => {
    this.setState({
      isVisible: false
    });
  }

  onHandleCancel = () => {
    this.setState({
      isVisible: false
    });
  }

  render() {
    const { isVisible, dateInput } = this.state;
    const { config } = this.props;
    return (
      <div>
        <Button
          type="primary"
          title="添加日期输入控件"
          onClick={this.onAddDateInputClick}
        >
          日期输入框
        </Button>
        <DateInputModal
          {...dateInput}
          config={config}
          isVisible={isVisible}
          onHandleConfirm={this.onHandleConfirm}
          onHandleCancel={this.onHandleCancel}
        />
      </div>
    )
  }
}
