import React from 'react';
import { EditorState } from 'draft-js';
import {
  Popover,
  DatePicker
} from 'antd';
import moment from 'moment';

import eventProxy from './../../customUtils/eventProxy';
import styles from './index.less';

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isVisible: false
    };
  }
  onHandleOpenClick = () => {
    this.setState({
      isOpen: true
    });
  }
  onHandleOkClick = () => {
    this.setState({
      isOpen: false
    });
  }
  onHandleDateChange = (date) => {
    const { entityKey, contentState, editorState, onEditorStateChange } = this.props;
    const newContentState = contentState.mergeEntityData(
      entityKey,
      { defaultVal: date }
    );
    const newState = EditorState.push(editorState, newContentState, 'change-block-data');
    onEditorStateChange(newState);
    this.setState({});
  }

  onHandleVisibleChange = (visible) => {
    this.setState({ isVisible: visible });
  }

  onHandleEditorClick = () => {
    eventProxy.trigger('dateInputEditor', 'DateInput');
    this.setState({ isVisible: false });
  }

  onHandleDeleteClick = () => {
    eventProxy.trigger('dateInputDelete');
    this.setState({ isVisible: false });
  }

  render() {
    const { entityKey, contentState, children } = this.props;
    const { isOpen, isVisible } = this.state;
    const {
      controlName,
      defaultVal,
      describeVal,
      dateFormat,
      entityColor
    } = contentState.getEntity(entityKey).getData();

    const content = (
      <div>
        <span className={styles.popupName}>{controlName}</span>
        日期输入框
        <span
          className={styles.editorBtn}
          title="编辑控件内容"
          onClick={this.onHandleEditorClick}
        >
          编辑
        </span>
        <span
          onClick={this.onHandleDeleteClick}
          className={styles.deleteBtn}
          title="删除控件"
        >
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
          {controlName && <span className={styles.controlName}>{controlName} : </span>}
        </Popover>
        <span
          className={styles.controlVal}
          onClick={this.onHandleOpenClick}
          title={describeVal}
        >
          <i className={styles.rim}> [ </i>
          <span style={{ color: `${entityColor}` }}>
            {moment(defaultVal).format(dateFormat) || ''}
          </span>
          <i className={styles.rim}> ] </i>
          <DatePicker
            showTime
            className={styles.datePicker}
            size="default"
            defaultValue={defaultVal}
            format={dateFormat}
            open={isOpen}
            onOk={this.onHandleOkClick}
            onChange={this.onHandleDateChange}
          />
          <span style={{ display: 'none' }}>{children}</span>
        </span>
      </span>
    );
  }
}
