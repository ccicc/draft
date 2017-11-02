import React from 'react';
import {
  Popover
} from 'antd';
import { PopupBox } from './../../components/Common';
import styles from './index.less';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      value: '',
      checked: true,
      isReuqired: true
    };
  }

  componentWillMount() {
    const { entityKey, contentState } = this.props;
    const {
      defaultVal,
      isRequired
    } = contentState.getEntity(entityKey).getData();
    this.setState({
      value: defaultVal,
      isRequired
    });
  }

  componentWillReceiveProps(nextProps) {
    const { entityKey, contentState } = nextProps;
    if (contentState !== this.contentState) {
      const { defaultVal, isRequired } = contentState.getEntity(entityKey).getData();
      this.setState({
        value: defaultVal,
        isRequired
      });
    }
  }

  onHandleVisibleChange = () => {
    // 弹出窗口显示或隐藏的回调函数
    const { value, isRequired } = this.state;
    const { contentState, entityKey } = this.props;
    const entityData = contentState.getEntity(entityKey).getData();
    if (value && value !== '') {
      contentState.replaceEntityData(
        entityKey,
        {
          ...entityData,
          defaultVal: value
        }
      );
      return true;
    } else if (isRequired && value === '') {
      // 必填项中如果值为空则设回原值
      this.setState({
        value: entityData.defaultVal
      });
      return true;
    }
    contentState.replaceEntityData(
      entityKey,
      {
        ...entityData,
        defaultVal: value
      }
    );
  }

  onHandleInputChange = (e) => {
    const { entityKey, contentState } = this.props;
    const { value } = e.target;
    const { typeVal, minNum, maxNum } = contentState.getEntity(entityKey).getData().dataType;
    switch (typeVal) {
      case 'number': {
        // 类型为number时的校验规则
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if (
          (!Number.isNaN(value) && reg.test(value) &&
            (Number.parseInt(value, 10) <= maxNum) &&
            (Number.parseInt(value, 10) >= minNum)) ||
          value === ''
        ) {
          this.setState({ value, checked: true });
          break;
        }
        this.setState({ checked: false });
        break;
      }
      case 'string': {
        // 普通文本的校验规则
        const reg = /^[\D]+$/;
        if (reg.test(value) || value === '') {
          this.setState({ value, checked: true });
          break;
        }
        this.setState({ checked: false });
        break;
      }
      default:
        this.setState({
          value,
          checked: true
        });
    }
  }

  render() {
    const { value, checked, isRequired } = this.state;
    const { entityKey, contentState, children } = this.props;
    const {
      controlID,
      controlName,
      describeVal,
      entityColor,
      dataType
    } = contentState.getEntity(entityKey).getData();

    const requiredContent = (<p>该项为<span style={{ color: 'red' }}>必填项</span>,请输入控件值</p>);
    const numberContent = (
      <p>
        请输入
        <span style={{ color: 'red' }}>{dataType.minNum}</span>
        到
        <span style={{ color: 'red' }}>{dataType.maxNum}</span>
        范围以内的
        <span style={{ color: 'red' }}>数值</span>
      </p>
    );
    const stringContent = (
      <p>请输入普通文本,<span style={{ color: 'red' }}>不能输入数值</span></p>
    );

    const content = (
      <div>
        <input
          autofocus // eslint-disable-line
          type="text"
          className={styles.editorInput}
          ref={element => this.input = element}
          value={this.state.value}
          onChange={this.onHandleInputChange}
        />
        {isRequired && value === '' && requiredContent}
        {dataType.typeVal === 'number' && !checked && numberContent}
        {dataType.typeVal === 'string' && !checked && stringContent}
      </div>
    );

    return (
      <span
        className={styles.root}
      >
        <PopupBox
          editorCommand="textInputEditor"
          deleteCommand="textInputDelete"
          controlID={controlID}
          controlName={controlName}
        >
          {controlName && <span className={styles.controlName}>{controlName} : </span>}
        </PopupBox>
        <span
          className={styles.controlVal}
          title={describeVal}
          onClick={this.onHandleClick}
        >
          <Popover
            placement="topLeft"
            trigger="click"
            content={content}
            onVisibleChange={this.onHandleVisibleChange}
          >
            <i className={styles.rim}> [ </i>
            <span
              style={{ color: entityColor }}
              className={styles.editorWrapper}
            >
              {value}
            </span>
            <i className={styles.rim}> ] </i>
            <span style={{ display: 'none' }}>{children}</span>
          </Popover>
        </span>
      </span>
    );
  }
}
