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

export default class SelectItem extends React.Component {
  static propTypes = {
    controlID: PropTypes.string.isRequired,
    onSetDefaultVal: PropTypes.func.isRequired,
    onAddDefaultVal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectItems: this.props.selectItems,
      currentSelected: '',
      inputVal: '',
      inputTitle: '',
      inputScore: '',
      isSelectAll: false
    };
  }

  componentWillMount() {
    // 组件初始化时控制全选按钮状态
    const { defaultVal } = this.props;
    const { selectItems } = this.state;
    if (defaultVal && defaultVal.split(',').length === selectItems.length) {
      this.setState({ isSelectAll: true });
    } else {
      this.setState({ isSelectAll: false });
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

  onInputScoreChange = (e) => {
    this.setState({
      inputScore: e.target.value
    });
  }

  onSelectChange = (e) => {
    const { selectItems } = this.state;
    const value = e.target.value;
    const currentItem = selectItems.filter(item => item.val === value)[0];
    this.setState({
      currentSelected: value,
      inputVal: currentItem.val,
      inputTitle: currentItem.title,
      inputScore: currentItem.score
    });
    setTimeout(() => this.props.onChange(this.state.selectItems), 0);
  }

  onAddNewItem = () => {
    // 添加新的项
    const { selectItems, inputVal, inputTitle, inputScore } = this.state;
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
        { val: inputVal, title: inputTitle, score: inputScore }
      ],
      inputVal: '',
      inputTitle: '',
      inputScore: ''
    });
    setTimeout(() => this.props.onChange(this.state.selectItems), 0);
    return true;
  }

  onRemoveItem = () => {
    // 移除项
    const { currentSelected, selectItems } = this.state;
    const newItems = selectItems.filter(item => item.val !== currentSelected);
    this.setState({
      selectItems: newItems,
      inputVal: '',
      inputTitle: '',
      inputScore: ''
    });
  }

  onEditorItem = () => {
    // 编辑当前项
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
    // 单选， 多选下拉框设置默认值
    const { onSetDefaultVal, onAddDefaultVal, controlID } = this.props;
    const { currentSelected, selectItems } = this.state;
    if (controlID === 'SelectionInput') {
      return onSetDefaultVal(currentSelected);
    }
    const newDefaultVal = onAddDefaultVal(currentSelected);
    if (newDefaultVal.split(',').length === selectItems.length) {
      this.setState({ isSelectAll: true });
    }
  }

  onSelectAllClick = () => {
    const { selectItems } = this.state;
    const { onAddDefaultVal } = this.props;
    selectItems.forEach(item => {
      onAddDefaultVal(item.val);
    });
    this.setState({
      isSelectAll: true
    });
  }

  unCheckedAll = () => {
    const { onCleanDefaultVal } = this.props;
    onCleanDefaultVal();
    this.setState({
      isSelectAll: false
    });
  }

  render() {
    const {
      selectItems,
      inputVal,
      inputTitle,
      inputScore,
      currentSelected,
      isSelectAll
    } = this.state;
    const { controlID } = this.props;

    const selectedBtn = isSelectAll === false
      ?
      (<Button   // eslint-disable-line
        icon="check-circle-o"
        title="全选"
        onClick={this.onSelectAllClick}
      />)
      :
      (<Button
        style={{ color: '#108ee9' }}
        icon="check-circle"
        title="全不选"
        onClick={this.unCheckedAll}
      />);

    return (
      <div className="root">
        <select
          multiple
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
            <Col span={8}>
              <Input
                size="default"
                placeholder="输入值"
                addonBefore="值"
                value={inputVal}
                onChange={this.onInputValChange}
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
            title={controlID === 'SelectionInput' ? '设置默认值' : '添加默认值'}
            onClick={this.onSetDefaultValue}
          />
          {controlID === 'SelectionMultipleInput' && selectedBtn}
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
