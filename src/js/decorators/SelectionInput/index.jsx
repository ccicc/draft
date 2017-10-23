import React from 'react';
import {
  Popover,
  Popconfirm,
  Select
} from 'antd';

import eventProxy from './../../customUtils/eventProxy';
import styles from './index.less';

const Option = Select.Option;
export default class SelectionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  onHandleClick = () => {
    const { isVisible } = this.state;
    this.setState({
      isVisible: !isVisible
    });
  }

  onEditorClick = () => {
    this.setState({
      isVisible: false
    });
    eventProxy.trigger('selectionInputEditor');
  }

  onDeleteClick = () => {
    this.setState({
      isVisible: false
    });
    eventProxy.trigger('selectionInputDelete');
  }

  onSelectValueChange = (value) => {
    const { entityKey, contentState } = this.props;
    contentState.mergeEntityData(entityKey, { defaultVal: value });
    this.setState({
      isRender: true
    });
  }

  onHandleVisibleChange = (isVisible) => {
    this.setState({
      isVisible
    });
  }

  render() {
    const { isVisible } = this.state;
    const { entityKey, contentState, children } = this.props;
    const {
      controlName,
      defaultVal,
      describeVal,
      entityColor,
      selectItems
    } = contentState.getEntity(entityKey).getData();

    const content = (
      <div>
        { controlName && <span className={styles.popupName}>{controlName}</span>}
        文本输入框
        <span
          className={styles.editorBtn}
          title="编辑控件内容"
          onClick={this.onEditorClick}
        >
          编辑
        </span>
        <Popconfirm
          placement="top"
          title="确认删除该控件"
          okText="确认"
          cancelText="取消"
          trigger="hover"
          onConfirm={this.onDeleteClick}
        >
          <span
            className={styles.deleteBtn}
            title="删除控件"
          >
            删除
          </span>
        </Popconfirm>
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
          <span
            className={styles.controlName}
            onClick={this.onHandleClick}
          >
            {controlName}
          </span>
          {
            controlName && <span>:</span>
          }
          <span
            className={styles.controlVal}
            title={describeVal}
            style={{ color: entityColor }}
          >
            <i className={styles.rim}> [ </i>
            <Select
              size="small"
              value={defaultVal}
              notFoundContent="没有可选项"
              onSelect={this.onSelectValueChange}
              dropdownMatchSelectWidth={false}
            >
              {
                selectItems.map(item => (
                  <Option
                    key={item.val}
                    title={item.title}
                    value={item.val}
                    style={{ color: item.val === defaultVal ? entityColor : '' }}
                  >
                    {item.val}
                  </Option>
                ))
              }
            </Select>
            <span style={{ display: 'none' }}>{children}</span>
            <i className={styles.rim}> ] </i>
          </span>
        </Popover>
      </span>
    );
  }
}
