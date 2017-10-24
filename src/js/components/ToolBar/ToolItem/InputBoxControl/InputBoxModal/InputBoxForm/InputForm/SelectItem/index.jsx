import React from 'react';
import {
  Button,
  Input,
  Row,
  Col,
  message
} from 'antd';
import styles from './index.less';

export default class SelectItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectItems: [],
      currentSelected: '',
      inputVal: '',
      inputTitle: ''
    };
  }

  componentWillMount() {
    const { value } = this.props;
    if (value) {
      this.setState({
        selectItems: value
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        selectItems: nextProps.value
      });
    }
  }

  onInputValChange = (e) => {
    this.setState({
      inputVal: e.target.value
    });
  }

  onInputTitleChange = (e) => {
    this.setState({
      inputTitle: e.target.value
    });
  }

  onSelectChange = (e) => {
    const { selectItems } = this.state;
    const value = e.target.value;
    const currentItem = selectItems.filter(item => item.val === value)[0];
    this.setState({
      currentSelected: value,
      inputVal: currentItem.val,
      inputTitle: currentItem.title
    });
    setTimeout(() => this.props.onChange(this.state.selectItems), 0);
  }

  onAddNewItem = () => {
    // 添加新的项
    const { selectItems, inputVal, inputTitle } = this.state;
    if (inputVal === '') {
      message.warning('值不能为空', 3);
      return false;
    } else if (selectItems.filter(item => item.val === inputVal).length > 0) {
      message.warning('不能输入重复的值', 3);
      return false;
    }
    this.setState({
      selectItems: [
        ...selectItems,
        { val: inputVal, title: inputTitle }
      ],
      inputVal: '',
      inputTitle: ''
    });
    return true;
  }

  onRemoveItem = () => {
    // 移除项
    const { currentSelected, selectItems } = this.state;
    const newItems = selectItems.filter(item => item.val !== currentSelected);
    this.setState({
      selectItems: newItems,
      inputVal: '',
      inputTitle: ''
    });
  }

  onEditorItem = () => {
    // 编辑器当前项
    const { currentSelected, selectItems, inputVal, inputTitle } = this.state;
    const newItems = selectItems.map(item => {
      if (item.val === currentSelected && inputVal !== '') {
        item.val = inputVal;
        item.title = inputTitle;
      }
      return item;
    });

    this.setState({
      selectItems: newItems
    });
  }

  onItemUpperMoving = () => {
    const { selectItems, currentSelected } = this.state;
    selectItems.forEach((item, index) => {
      if (item.val === currentSelected && index > 0) {
        selectItems[index] = selectItems[index - 1];
        selectItems[index - 1] = item;
      }
    });
    this.setState({ selectItems });
  }

  onItemUnderMoving = () => {
    const { selectItems, currentSelected } = this.state;
    let currentIndex;
    selectItems.forEach((item, index) => {
      if (item.val === currentSelected) {
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

  onSetDefaultValue = () => {
    const { onSetFieldsValue } = this.props;
    const { currentSelected } = this.state;
    onSetFieldsValue(currentSelected);
  }

  render() {
    const { selectItems, inputVal, inputTitle, currentSelected } = this.state;

    return (
      <div className="root">
        <select
          multiple="multiple"
          className={styles.select}
          onChange={this.onSelectChange}
          value={[currentSelected]}
        >
          {
            selectItems.map((item, index) => (
              <option
                key={index}
                value={item.val}
                title={item.title}
              >
                {item.val}
              </option>
            ))
          }
        </select>
        <div style={{ width: '100%' }}>
          <Row gutter={15}>
            <Col span={12}>
              <Input
                size="default"
                placeholder="输入值"
                addonBefore="值"
                value={inputVal}
                onChange={this.onInputValChange}
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
          </Row>
        </div>
        <Button.Group>
          <Button
            type="primary"
            icon="plus"
            title="添加"
            onClick={this.onAddNewItem}
          />
          <Button
            icon="edit"
            title="编辑"
            onClick={this.onEditorItem}
          />
          <Button
            icon="arrow-up"
            title="向上移动"
            onClick={this.onItemUpperMoving}
          />
          <Button
            icon="arrow-down"
            title="向下移动"
            onClick={this.onItemUnderMoving}
          />
          <Button
            style={{ color: '#108ee9' }}
            icon="star"
            title="设置默认值"
            onClick={this.onSetDefaultValue}
          />
          <Button
            icon="delete"
            style={{ color: 'red' }}
            title="删除"
            onClick={this.onRemoveItem}
          />
        </Button.Group>
      </div>
    );
  }
}
