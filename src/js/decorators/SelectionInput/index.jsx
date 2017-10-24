import React from 'react';
import { EditorState } from 'draft-js';
import {
  Popover,
  Dropdown,
  Menu
} from 'antd';

import eventProxy from './../../customUtils/eventProxy';
import styles from './index.less';

const Item = Menu.Item;
export default class SelectionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
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
    eventProxy.trigger('selectionInputEditor', 'SelectionInput');
  }

  onDeleteClick = () => {
    this.setState({
      isVisible: false
    });
    eventProxy.trigger('selectionInputDelete');
  }

  onSelectValueChange = (props) => {
    const { entityKey, contentState, editorState, onEditorStateChange } = this.props;
    const newContentState = contentState.mergeEntityData(
      entityKey,
      { defaultVal: props.key }
    );
    const newState = EditorState.push(editorState, newContentState, 'change-block-data');
    onEditorStateChange(newState);
    this.setState({
      update: true
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
        {controlName && <span className={styles.popupName}>{controlName}</span>}
        文本输入框
        <span
          className={styles.editorBtn}
          title="编辑控件内容"
          onClick={this.onEditorClick}
        >
          编辑
        </span>
        <span
          className={styles.deleteBtn}
          title="删除控件"
          onClick={this.onDeleteClick}
        >
          删除
        </span>
      </div>
    );

    const menu = (
      <Menu onClick={this.onSelectValueChange}>
        {
          selectItems.map(item => (
            <Item
              key={item.val}
              disabled={item.val === defaultVal}
            >
              <span title={item.title}>{item.val}</span>
            </Item>
          ))
        }
      </Menu>
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
            >{controlName} : </span>
          }
        </Popover>
        <span
          className={styles.controlVal}
          title={describeVal}
          onClick={this.onSelectClick}
        >
          <i className={styles.rim}> [ </i>
          <Dropdown
            overlay={menu}
            trigger={['click']}
            placement="bottomCenter"
          >
            <span style={{ color: entityColor }}>{defaultVal}</span>
          </Dropdown>
          <i className={styles.rim}> ] </i>
          <span style={{ display: 'none' }}>{children}</span>
        </span>
      </span>
    );
  }
}
