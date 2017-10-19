import React from 'react';
import {
  Popover,
  Popconfirm
} from 'antd';
import eventProxy from 'customUtils/eventProxy';  // eslint-disable-line
import styles from './index.less';

class TextInput extends React.Component {
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
    eventProxy.trigger('textInputEditor');
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
    const { controlName, defaultVal, describeVal } = contentState.getEntity(entityKey).getData();

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
            删 除
          </span>
        </Popconfirm>
      </div>
    );

    return (
      <span
        className={styles.root}
        onClick={this.onHandleClick}
      >
        <span className={styles.controlName}>{controlName}</span>
        <span>:</span>
        <Popover
          visible={isVisible}
          content={content}
          placement="topLeft"
          trigger="click "
          onVisibleChange={this.onHandleVisibleChange}
        >
          <span
            className={styles.controlVal}
            title={describeVal}
          >
            <i className={styles.rim}> [ </i>
            <span>{defaultVal}</span>
            <i className={styles.rim}> ] </i>
          </span>
          <span style={{ display: 'none' }} >{children}</span>
        </Popover>
        <input
          disabled
          title={describeVal}
          className={styles.input}
          type="text"
        />
      </span>
    );
  }
}

function findTextInputEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'TEXTINPUT'
      );
    },
    callback
  );
}


function textInputDecorator() {
  return {
    strategy: findTextInputEntities,
    component: TextInput
  };
}

export default textInputDecorator;
