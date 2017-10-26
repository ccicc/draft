import React from 'react';
import { Input, Button } from 'antd';
import styles from './index.less';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditor: false,
      isExpand: false,
      value: '',
      preValue: ''
    };
  }

  componentWillMount() {
    const { value } = this.props;
    this.setState({
      value,
      preValue: value
    });
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    this.setState({
      value,
      preValue: value
    });
  }

  onHandleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  onEditorClick = () => {
    this.setState({
      isEditor: true
    });
  }

  onConfirmClick = () => {
    const { onEditorItem } = this.props;
    const { preValue, value } = this.state;
    onEditorItem(preValue, value);
    this.setState({
      isEditor: false
    });
  }

  onItemUpperClick = () => {
    const { value } = this.state;
    const { onItemUpperMoving } = this.props;
    onItemUpperMoving(value);
  }

  onItemUnderClick = () => {
    const { value } = this.state;
    const { onItemUnderMoving } = this.props;
    onItemUnderMoving(value);
  }

  onItemRemoveClick = () => {
    const { value } = this.state;
    const { onRemoveItem } = this.props;
    onRemoveItem(value);
  }

  render() {
    const { onChange, values, selectItems } = this.props;
    const { isExpand, isEditor, value } = this.state;
    const controlBtn = (
      <Button.Group className={styles.control}>
        {
          isEditor ?
            <Button
              type="primary"
              size="small"
              title="确定"
              icon="check"
              onClick={this.onConfirmClick}
            /> :
            <Button
              style={{ color: '#49a9ee' }}
              size="small"
              title="编辑"
              icon="edit"
              onClick={this.onEditorClick}
            />
        }
        <Button
          size="small"
          title="向上移动"
          icon="arrow-up"
          onClick={this.onItemUpperClick}
          disabled={this.props.index === 0}
        />
        <Button
          size="small"
          title="向下移动"
          icon="arrow-down"
          onClick={this.onItemUnderClick}
          disabled={this.props.index === selectItems.length - 1}
        />
        <Button
          style={{ color: 'red' }}
          size="small"
          title="删除"
          icon="delete"
          onClick={this.onItemRemoveClick}
        />
      </Button.Group>
    );

    return (
      <li
        className={styles.item}
        onMouseEnter={() => this.setState({ isExpand: true })}
        onMouseLeave={() => this.setState({ isExpand: false })}
      >
        <label className={styles.label}>
          <input
            className={styles.input}
            type="checkbox"
            value={value}
            checked={values.indexOf(value) !== -1}
            onChange={onChange}
          />
          {
            isEditor ?
              (<Input
                size="small"
                value={value}
                style={{ width: '30%' }}
                onChange={this.onHandleChange}
              />) :
              value
          }
          {isExpand && controlBtn}
        </label>
      </li>
    );
  }
}
