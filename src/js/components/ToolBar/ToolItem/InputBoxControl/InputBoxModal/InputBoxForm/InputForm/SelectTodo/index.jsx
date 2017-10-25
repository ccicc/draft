/* eslint-disable */

import React from 'react';
import {
  Button,
  Input,
  Row,
  Col,
  message
} from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';
import TodoItem from './TodoItem';

export default class SelectTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectItems: [
        { checked: false, value: 'aaa', title: 'aaaa' },
        { checked: false, value: 'bb', title: 'bbbb' }
      ],
      inputVal: '',
      inputTitle: ''
    };
  }

  onChange = (e) => {
    const { value } = e.target;
    const { selectItems } = this.state;
    const newItems = selectItems.map(item => {
      if (item.value === value) {
        item.checked = !item.checked
      }
    });
    this.setState({
      selectitems: newItems
    });
  }

  onInputValueChange = (e) => {
    this.setState({
      inputVal: e.target.value
    });
  }

  onInputTitleChange = (e) => {
    this.setState({
      inputTitle: e.target.value
    });
  }

  onAddNewItem = () => {
    const { inputVal, inputTitle, selectItems } = this.state;
    if (inputVal === '') {
      message.warning('值不能为空', 3);
      return false;
    } else if (selectItems.filter(item => item.value === inputVal).length > 0) {
      message.warning('不能输入重复的值');
      return false;
    }
    this.setState({
      selectItems: [
        ...selectItems,
        { value: inputVal, title: inputTitle }
      ],
      inputVal: '',
      inputTitle: ''
    });
  }

  render() {
    const { inputVal, inputTitle, selectItems } = this.state;

    return (
      <div>
        <div className={styles.wrapper}>
          <ul style={{ padding: 0 }}>
            {
              selectItems.map((item, index) => (
                <TodoItem 
                  key={index}
                  value={item.value}
                  isChecked={item.checked}
                  onChange={this.onChange}
                />
              ))
            }
          </ul>
        </div>
        <Row gutter={15}>
          <Col span={12}>
            <Input
              size="default"
              placeholder="输入值"
              addonBefore="值"
              value={inputVal}
              onChange={this.onInputValueChange}
            />
          </Col>
          <Col span={12}>
            <Input
              size="default"
              placeholder="输入描述"
              addonBefore="描述"
              value={inputTitle}
              onChange={this.onInputTitleChange}
            />
          </Col>
          <Col span={12}>
            <Button
              style={{ width: '100%' }}
              size="default"
              type="primary"
              icon="plus"
              title="添加"
              onClick={this.onAddNewItem}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
