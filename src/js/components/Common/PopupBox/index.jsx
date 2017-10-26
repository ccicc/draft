import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import eventProxy from './../../../customUtils/eventProxy';
import styles from './index.less';

export default class PopupBox extends React.Component {
  static propTypes = {
    editorCommand: PropTypes.string.isRequired,
    deleteCommand: PropTypes.string.isRequired,
    controlID: PropTypes.string.isRequired,
    controlName: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  onHandleVisibleChange = (visible) => {
    this.setState({
      isVisible: visible
    });
  }

  onHandleEditor = () => {
    const { editorCommand, controlID } = this.props;
    this.setState({
      isVisible: false
    });
    eventProxy.trigger(editorCommand, controlID);
  }

  onHandleDelete = () => {
    const { deleteCommand, controlID } = this.props;
    this.setState({
      isVisible: false
    });
    eventProxy.trigger(deleteCommand, controlID);
  }

  getInputBoxName = () => {
    const { controlID } = this.props;
    let inputBoxName = '';
    switch (controlID) {
      case 'TextInput':
        inputBoxName = '文本输入框';
        break;
      case 'DateInput':
        inputBoxName = '日期输入框';
        break;
      case 'SelectionInput':
        inputBoxName = '下拉单选输入框';
        break;
      case 'SelectionMultipleInput':
        inputBoxName = '下拉多选输入框';
        break;
      default:
        inputBoxName = '多选框输入框';
    }
    return inputBoxName;
  }

  render() {
    const { controlName, children } = this.props;
    const { isVisible } = this.state;
    const content = (
      <div>
        {
          controlName &&
          <span className={styles.controlName}>{controlName}</span>
        }
        {this.getInputBoxName()}
        <span
          className={styles.editorBtn}
          title="编辑控件内容"
          onClick={this.onHandleEditor}
        >
          编 辑
        </span>
        <span
          className={styles.editorDelete}
          title="删除控件"
          onClick={this.onHandleDelete}
        >
          删 除
        </span>
      </div>
    );

    return (
      <Popover
        visible={isVisible}
        content={content}
        trigger="click"
        placement="topLeft"
        onVisibleChange={this.onHandleVisibleChange}
      >
        {children}
      </Popover>
    );
  }
}
