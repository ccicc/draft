/*

  global
  document: false

*/ 

import React from 'react';
import { EditorState } from 'draft-js';
import {
  Popover,
  Dropdown,
  Menu,
  Icon
} from 'antd';
import eventProxy from './../../customUtils/eventProxy';
import styles from './index.less';

const Item = Menu.Item;

export default class SelectionMultipleInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isExpand: false
    };
  }

  componentDidMount() {
    document.body.addEventListener('click', (e) => {
      if (e.target && e.target.matches('li.ant-dropdown-menu-item')) {
        return;
      }
      this.setState({
        isExpand: false
      });
    });
  }

  componentWillUnmount() {
    document.removeEventListener('click');
  }

  onHandleClick = () => {
    this.setState({
      isVisible: true
    });
  }

  onHandleExpand = () => {
    this.setState({
      isExpand: true
    });
  }

  onEditorClick = () => {
    this.setState({
      isVisible: false
    });
    eventProxy.trigger('selectionMultipleEditor', 'SelectionMultipleInput');
  }

  onDeleteClick = () => {
    this.setState({
      isVisible: false
    });
    eventProxy.trigger('selectionMultipleDelete');
  }

  onHandleVisibleChange = (visible) => {
    this.setState({
      isVisible: visible,
    });
  }

  onSelectValueChange = (options) => {
    // 增减子项并更新contentState对象
    const { entityKey, contentState, editorState, onEditorStateChange } = this.props;
    const { defaultVal } = contentState.getEntity(entityKey).getData();
    let collectionItems = defaultVal.split(',');
    if (collectionItems.every(item => options.key !== item)) {
      collectionItems.push(options.key);
    } else {
      collectionItems = collectionItems.filter(item => item !== options.key);
    }
    const newDefaultVal = collectionItems.join(',');
    const newContentState = contentState.mergeEntityData(
      entityKey,
      { defaultVal: newDefaultVal }
    );
    const newState = EditorState.push(editorState, newContentState, 'change-block-data');
    onEditorStateChange(newState);
    this.setState({
      update: true
    });
  }

  render() {
    const { isVisible, isExpand } = this.state;
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
        >编辑</span>
        <span
          className={styles.deleteBtn}
          title="删除控件"
          onClick={this.onDeleteClick}
        >删除</span>
      </div>
    );

    const menu = (
      <Menu
        multiple
        onClick={this.onSelectValueChange}
      >
        {
          selectItems.map((item, index) => (
            <Item
              key={`item-${index}`}
            >
              <span title={item.title}>{item.val}</span>
              {
                defaultVal.split(',').some(val => val === item.val) &&
                <Icon type="check" />
              }
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
          onClick={this.onHandleExpand}
        >
          <i className={styles.rim}> [ </i>
          <Dropdown
            overlay={menu}
            visible={isExpand}
            trigger={['click']}
            placement="bottomCenter"
          >
            <span style={{ color: entityColor }}>
              {
                defaultVal
                  ?
                  defaultVal.split(',').map((item, index) => {
                    if (index === defaultVal.split(',').length - 1 || (item === '')) {
                      return (<span key={index}>{item}</span>);
                    } else if (item === '未知') {
                      return '';
                    }
                    return (<span key={index}>{item}, </span>);
                  })
                  :
                  (<span>未 知</span>)
              }
            </span>
          </Dropdown>
          <i className={styles.rim}> ] </i>
          <span style={{ display: 'none' }}>{children}</span>
        </span>
      </span>
    );
  }
}
