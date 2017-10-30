import React from 'react';
import PropTypes from 'prop-types';
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
  static propTypes = {
    controlID: PropTypes.string,
    selectTodos: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        title: PropTypes.string
      })),
      values: PropTypes.arrayOf(PropTypes.string),
      currentValue: PropTypes.string
    })
  };
  constructor(props) {
    super(props);
    this.state = {
      selectItems: this.props.selectTodos.items,
      values: this.props.selectTodos.selectedValues,
      currentValue: this.props.selectTodos.currentValue,
      inputVal: '',
      inputTitle: '',
      isSelectedAll: false
    };
  }

  onCheckboxChange = (e) => {
    // 多选框change事件
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
  }

  onRadioboxChange = (e) => {
    // 单选框change事件
    const { value } = e.target;
    this.setState({
      currentValue: value
    });
    setTimeout(() => {
      this.props.onChange({
        items: this.state.selectItems,
        currentValue: value
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

    setTimeout(() => {
      this.props.onChange({
        items: this.state.selectItems,
        selectedValues: this.state.values,
        currentValue: this.state.currentValue
      });
    }, 0);
  }

  onSelectedAllItem = () => {
    const { selectItems, values } = this.state;
    selectItems.forEach(item => {
      values.push(item.value);
    });
    this.setState({
      values,
      isSelectedAll: true
    });
  }

  onClearAllItem = () => {
    this.setState({
      values: [],
      isSelectedAll: false
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
    const { inputVal, inputTitle, selectItems, values, currentValue, isSelectedAll } = this.state;

    const selectedBtn =
      isSelectedAll ?
        (<Button
          style={{ width: '30%' }}
          size="default"
          title="全不选"
          icon="check-circle"
          disabled={values.length === 0}
          onClick={this.onClearAllItem}
        />)
        :
        (<Button
          style={{ width: '30%' }}
          size="default"
          title="全选"
          icon="check-circle-o"
          disabled={values.length === selectItems.length}
          onClick={this.onSelectedAllItem}
        />);

    return (
      <div>
        <div className={styles.wrapper}>
          <ul style={{ padding: 0 }}>
            {
              selectItems.map((item, index) => (
                <TodoItem
                  key={index}
                  index={index}
                  controlID={this.props.controlID}
                  title={item.title}
                  value={item.value}
                  values={values}
                  currentValue={currentValue}
                  selectItems={selectItems}
                  onCheckboxChange={this.onCheckboxChange}
                  onRadioboxChange={this.onRadioboxChange}
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
            <Button.Group style={{ width: '100%' }}>
              <Button
                style={{ width: '70%' }}
                size="default"
                type="primary"
                icon="plus"
                title="添加"
                onClick={this.onAddNewItem}
              />
              {
                this.props.controlID === 'CheckBoxInput' &&
                selectedBtn
              }
            </Button.Group>
          </Col>
        </Row>
      </div>
    );
  }
}
