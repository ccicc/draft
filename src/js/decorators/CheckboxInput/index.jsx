import React from 'react';
import {
  Popover
} from 'antd';
import { EditorState } from 'draft-js';
import styles from './index.less';

export default class CheckboxInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  onHandleClick = () => {
    this.setState({
      isVisible: true
    });
  }

  onHandleVisibleChange = (visible) => {
    this.setState({
      isVisible: visible
    });
  }

  onHandleEditor = () => {
    this.setState({
      isVisible: false
    });
  }

  onHandleDelete = () => {
    this.setState({
      isVisible: false
    });
  }

  onHandleChange = (e) => {
    const { checked, value } = e.target;
    const { entityKey, contentState, editorState, onEditorStateChange } = this.props;
    const { selectTodos } = contentState.getEntity(entityKey).getData();
    let { selectedValues } = selectTodos;
    if (checked && selectedValues.indexOf(value) === -1) {
      selectedValues.push(value);
    } else {
      selectedValues = selectedValues.filter(item => item !== value);
    }
    const newContentState = contentState.mergeEntityData(
      entityKey,
      { selectTodos: { ...selectTodos, selectedValues } }
    );
    onEditorStateChange(EditorState.push(editorState, newContentState, 'insert-cahracter'));
    this.setState({
      updateData: true
    });
  }

  render() {
    const { isVisible } = this.state;
    const { entityKey, contentState, children } = this.props;
    const {
      controlName,
      describeVal,
      entityColor,
      selectTodos
    } = contentState.getEntity(entityKey).getData();
    const { items, selectedValues } = selectTodos;

    const content = (
      <div>
        {
          controlName &&
          <span className={styles.popupName}>{controlName}</span>
        }
        文本输入框
        <span className={styles.editorBtn} title="编辑控件内容">
          编辑
        </span>
        <span className={styles.deleteBtn} title="删除控件">
          删除
        </span>
      </div>
    );

    return (
      <span className={styles.root}>
        <Popover
          visible={isVisible}
          content={content}
          placement="topLeft"
          trigger="click"
          onVisibleChange={this.onHandleVisibleChange}
        >
          {
            controlName &&
            <span
              className={styles.controlName}
              onClick={this.onHandleClick}
            >{controlName}：</span>
          }
        </Popover>
        <span
          className={styles.controlVal}
          title={describeVal}
        >
          <span className={styles.rim}> [ </span>
          {
            items.map((item, index) => (
              <span
                key={index}
                className={styles.item}
                style={{ color: entityColor }}
              >
                <label className={styles.itemLable}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    value={item.value}
                    checked={selectedValues.indexOf(item.value) !== -1}
                    onChange={this.onHandleChange}
                  />
                  {item.value},
                </label>
              </span>
            ))
          }
          <span className={styles.rim}> ] </span>
          <span style={{ display: 'none' }}>{children}</span>
        </span>
      </span>
    );
  }
}
