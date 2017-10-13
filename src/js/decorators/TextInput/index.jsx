/* eslint-disable */ 
import React from 'react';
import {
  Popover
} from 'antd';
import eventProxy from 'customUtils/eventProxy';
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
    const {
      controlName,
      defaultVal,
      describeVal
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
          onClick={this.onDeleteClick}
        >
          删 除
        </span>
      </div>
    );

    return (
      <span className={styles.root}>
        {/* <span className={styles.controlName}>{controlName}</span>
        <span>:</span> */}
        <Popover
          visible={isVisible}
          content={content}
          placement="top"
          trigger="click "
          onVisibleChange={this.onHandleVisibleChange}
        >
          {/* <span
            className={styles.controlVal}
            title={describeVal}
            onClick={this.onHandleClick}
          >
            <i className={styles.rim}> [ </i>
            <span>{defaultVal}</span>
            <i className={styles.rim}> ] </i>
          </span> */}
          <span onClick={this.onHandleClick}>{children}</span>
        </Popover>
      </span>
    )
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
