/* eslint-disable */ 

import React from 'react';
import { Input, Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditor: false,
      isExpand: false
    };
  }

  onEditorClick = () => {
    this.setState({
      isEditor: false
    });
  }

  render() {
    const { isChecked, value, onChange } = this.props;
    const { isEditor, isExpand } = this.state;

    const controlBtn = (
      <Button.Group className={styles.control}>
        <Button
          style={{ color: '#49a9ee' }}
          size="small"
          title="编辑"
          icon="edit"
          onClick={this.onEditorClick}
        />
        <Button
          size="small"
          title="向上移动"
          icon="arrow-up"
        />
        <Button
          size="small"
          title="向下移动"
          icon="arrow-down"
        />
        <Button
          style={{ color: 'red' }}
          size="small"
          title="删除"
          icon="delete"
        />
      </Button.Group>
    );

    return (
      <li
        className={styles.item}
        onMouseEnter={() => this.setState({ isExpand: true })}
        onMouseLeave={() => this.setState({ isExpand: false })}
      >
        {
          <label className={styles.label}>
          <input
            className={styles.input}
            type="checkbox"
            value={value}
            checked={isChecked}
            onChange={onChange}
          />
          {value}
          { isExpand && controlBtn}
        </label>
      </li>}
    );
  }
}
