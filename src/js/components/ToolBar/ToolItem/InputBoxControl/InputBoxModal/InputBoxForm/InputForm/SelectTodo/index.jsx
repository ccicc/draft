import React from 'react';
import {
  Button,
  Input,
  Row,
  Col,
  message
} from 'antd';
import styles from './index.less';
import TodoItem from './TodoItem';

export default class SelectTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectItems: [],
      values: [],
      inputVal: '',
      inputTitle: ''
    };
  }

  onChange = (e) => {
    const { value, checked } = e.target;
    let { values } = this.state;
    if (checked && values.indexOf(value) === -1) {
      values.push(value);
    } else {
      values = values.filter(item => item !== value);
    }
    this.setState({
      values
    });

    setTimeout(() => {
      this.props.onChange({
        items: this.state.selectItems,
        selectedValues: this.state.values
      });
    }, 0);
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

  onEditorItem = (preValue, value) => {
    // 编辑当前项
    const { selectItems, values } = this.state;
    const newSelectItems = selectItems.map(item => {
      if (item.value === preValue) {
        item.value = value;
      }
      return item;
    });
    const newValues = values.filter(item => item !== preValue);
    newValues.push(value);
    this.setState({
      selectItems: newSelectItems,
      values: newValues
    });
  }

  onItemUpperMoving = (value) => {
    // 上移当前项
    const { selectItems } = this.state;
    selectItems.forEach((item, index) => {
      if (item.value === value && index > 0) {
        selectItems[index] = selectItems[index - 1];
        selectItems[index - 1] = item;
      }
    });
    this.setState({ selectItems });
  }

  onItemUnderMoving = (value) => {
    // 下移当前项
    const { selectItems } = this.state;
    let currentIndex;
    selectItems.forEach((item, index) => {
      if (item.value === value) {
        currentIndex = index;
      }
    });
    if (currentIndex < selectItems.length - 1) {
      const temp = selectItems[currentIndex];
      selectItems[currentIndex] = selectItems[currentIndex + 1];
      selectItems[currentIndex + 1] = temp;
    }
    this.setState({ selectItems });
  }

  onRemoveItem = (value) => {
    // 移除当前项
    const { selectItems } = this.state;
    const newItems = selectItems.filter(item => item.value !== value);
    this.setState({
      selectItems: newItems
    });
  }

  render() {
    const { inputVal, inputTitle, selectItems, values } = this.state;

    return (
      <div>
        <div className={styles.wrapper}>
          <ul style={{ padding: 0 }}>
            {
              selectItems.map((item, index) => (
                <TodoItem
                  key={index}
                  index={index}
                  value={item.value}
                  values={values}
                  selectItems={selectItems}
                  onChange={this.onChange}
                  onEditorItem={this.onEditorItem}
                  onItemUpperMoving={this.onItemUpperMoving}
                  onItemUnderMoving={this.onItemUnderMoving}
                  onRemoveItem={this.onRemoveItem}
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
    );
  }
}
