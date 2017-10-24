import React from 'react';
import {
  Popover,
} from 'antd';
import eventProxy from 'customUtils/eventProxy';  // eslint-disable-line
import styles from './index.less';

export default class TextInput extends React.Component {
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
    eventProxy.trigger('textInputEditor', 'TextInput');
  }

  onDeleteClick = () => {
    this.setState({
      isVisible: false
    });
    eventProxy.trigger('textInputDelete');
  }

  onHandleVisibleChange = (visible) => {
    this.setState({
      isVisible: visible
    });
  }

  render() {
    const { isVisible } = this.state;
    const { entityKey, contentState, children } = this.props;
    const {
      controlName,
      defaultVal,
      describeVal,
      entityColor
    } = contentState.getEntity(entityKey).getData();

    const content = (
      <div>
        <span className={styles.popupName}>{controlName}</span>
        文本输入框
        <span
          className={styles.editorBtn}
          title="编辑控件内容"
          onClick={this.onEditorClick}
        >
          编 辑
        </span>
        <span
          className={styles.deleteBtn}
          title="删除控件"
        >
          删 除
        </span>
      </div>
    );

    return (
      <span
        className={styles.root}
        onClick={this.onHandleClick}
      >
        <Popover
          visible={isVisible}
          content={content}
          placement="topLeft"
          trigger="click "
          onVisibleChange={this.onHandleVisibleChange}
        >
          {controlName && <span className={styles.controlName}>{controlName} : </span>}
        </Popover>
        <span
          className={styles.controlVal}
          title={describeVal}
        >
          <i className={styles.rim}> [ </i>
          <span style={{ color: entityColor }}>{defaultVal}</span>
          <i className={styles.rim}> ] </i>
          <span style={{ display: 'none' }}>{children}</span>
        </span>
      </span>
    );
  }
}
