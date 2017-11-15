import React from 'react';
import { is } from 'immutable';
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
        title: PropTypes.string,
        score: PropTypes.string
      })),
      values: PropTypes.arrayOf(PropTypes.string),
      currentValue: PropTypes.string,
      onSetDefaultVal: PropTypes.func.isRequried
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
      inputScore: ''
    };
  }

  componentWillMount() {
    const { items, selectedValues } = this.props.selectTodos;
    if (
      items.length !== 0 &&
      selectedValues.length !== 0 &&
      items.length === selectedValues.length
    ) {
      this.setState({
        isSelectedAll: true
      });
    } else {
      this.setState({
        isSelectedAll: false
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};
    const thisState = this.state || {};
    if (
      Object.keys(thisProps).length !== Object.keys(nextState).length ||
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

    this.props.onSetDefaultVal(values.join(','));
    this.props.onChange({
      ...this.props.selectTodos,
      selectedValues: values,
    });
  }

  onRadioboxChange = (e) => {
    // 单选框change事件
    const { value } = e.target;
    this.setState({
      currentValue: value
    });
    this.props.onSetDefaultVal(value);
    this.props.onChange({
      ...this.props.selectTodos,
      items: this.state.selectItems,
      currentValue: value
    });
  }

  onInputValueChange = (e) => {
    // 值
    this.setState({
      inputVal: e.target.value
    });
  }

  onInputTitleChange = (e) => {
    // 描述
    this.setState({
      inputTitle: e.target.value
    });
  }

  onInputScoreChange = (e) => {
    // 受控
    this.setState({
      inputScore: e.target.value
    });
  }

  onAddNewItem = () => {
    // 添加项
    const { inputVal, inputTitle, inputScore, selectItems } = this.state;
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
        { value: inputVal, title: inputTitle, score: inputScore }
      ],
      inputVal: '',
      inputTitle: '',
      inputScore: ''
    });

    setTimeout(() => {
      this.props.onChange({
        ...this.props.selectTodos,
        items: this.state.selectItems,
        selectedValues: this.state.values,
        currentValue: this.state.currentValue
      });
    }, 0);
  }

  onSelectedAllItem = () => {
    // 全选
    const { selectItems, values } = this.state;
    selectItems.forEach(item => {
      values.push(item.value);
    });
    this.setState({
      values,
      isSelectedAll: true
    });
    setTimeout(() => {
      this.props.onChange({
        ...this.props.selectTodos,
        selectedValues: this.state.values
      });
    });
  }

  onClearAllItem = () => {
    // 清除所有项
    this.setState({
      values: [],
      isSelectedAll: false
    });
    setTimeout(() => {
      this.props.onChange({
        ...this.props.selectTodos,
        selectedValues: this.state.values
      });
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
    const {
      values,
      inputVal,
      inputTitle,
      inputScore,
      selectItems,
      currentValue,
      isSelectedAll
    } = this.state;

    const selectedBtn =
      isSelectedAll ?
        (<Button
          style={{ width: '30%' }}
          size="default"
          title="全不选"
          icon="check-circle"
          onClick={this.onClearAllItem}
        />)
        :
        (<Button
          style={{ width: '30%' }}
          size="default"
          title="全选"
          icon="check-circle-o"
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
          <Col span={8}>
            <Input
              size="default"
              placeholder="输入值"
              addonBefore="值"
              value={inputVal}
              onChange={this.onInputValueChange}
            />
          </Col>
          <Col span={8}>
            <Input
              size="default"
              placeholder="输入描述"
              addonBefore="描述"
              value={inputTitle}
              onChange={this.onInputTitleChange}
            />
          </Col>
          <Col span={8}>
            <Input
              size="default"
              placeholder="输入分数"
              addonBefore="分数"
              value={inputScore}
              onChange={this.onInputScoreChange}
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
