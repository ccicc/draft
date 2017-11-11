import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import { PopupBox } from './../../components/Common';
import logicalControlHOC from './../LogicalControlHOC';

import styles from './index.less';

class TextInput extends React.Component {
  static propTypes = {
    entityKey: PropTypes.string,
    children: PropTypes.array,
    contentState: PropTypes.object,
    onLogicalControl: PropTypes.func.isRequired, // 逻辑质控方法
    onReadOnlyChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '', // 文本控件值
      checked: true, // 是否校验
      isReuqired: true, // 是否必填
      isEditor: false, // 是否只读
      controlShow: true // 逻辑质控 是否显示
    };
  }

  componentWillMount() {
    // 从实体中获取数据并初始化状态
    const { entityKey, contentState } = this.props;
    const {
      defaultVal,
      isRequired,
      controlShow
    } = contentState.getEntity(entityKey).getData();
    this.setState({
      value: defaultVal,
      isRequired,
      controlShow: controlShow !== 'hidden'
    });
  }

  componentDidMount() {
    this.input && this.input.focus();
    this.props.onLogicalControl(this.state.value);
  }

  componentWillReceiveProps(nextProps) {
    const { entityKey, contentState } = nextProps;
    const {
      defaultVal,
      isRequired,
      controlShow
    } = contentState.getEntity(entityKey).getData();
    this.setState({
      value: defaultVal,
      isRequired,
      controlShow: controlShow !== 'hidden'
    });
    this.props.onLogicalControl(defaultVal);
  }

  onHandleClick = () => {
    // 点击控件时设置编辑器全局只读状态
    this.setState({
      isEditor: true
    });
    this.props.onReadOnlyChange(true);
    this.input && this.input.focus();
  }

  onHandleBlur = () => {
    // 失去焦点时的回调
    const { value, isRequired, checked } = this.state;
    const { contentState, entityKey } = this.props;
    const entityData = contentState.getEntity(entityKey).getData();
    if ((isRequired && value === '') || !checked) {
      // 必填项中如果值为空或校验失败则设回原值
      this.setState({
        value: entityData.defaultVal
      });
      return;
    }
    contentState.replaceEntityData(
      entityKey,
      {
        ...entityData,
        defaultVal: value
      }
    );
    this.setState({
      isEditor: false
    });
    this.props.onLogicalControl(value);
    // 设置全局只读为false
    this.props.onReadOnlyChange(false);
  }

  onHandleInputChange = (e) => {
    // 输入框受控方法
    const { entityKey, contentState } = this.props;
    const { value } = e.target;
    const {
      typeVal,
      minNum,
      maxNum,
      regexp
    } = contentState.getEntity(entityKey).getData().dataType;
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
          this.setState({ checked: true, value });
          break;
        }
        this.setState({ checked: false, value });
        break;
      }
      case 'string': {
        // 普通文本的校验规则
        const reg = /^[\D]+$/;
        if (reg.test(value) || value === '') {
          this.setState({ checked: true, value });
          break;
        }
        this.setState({ checked: false, value });
        break;
      }
      case 'regexp': {
        // 自定义正则校验规则
        const reg = new RegExp(regexp.split('/')[1], regexp.split('/')[2]);
        if (reg.test(value) || value === '') {
          this.setState({ checked: true, value });
          break;
        }
        this.setState({ checked: false, value });
        break;
      }
      case 'email': {
        // 邮箱校验
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(value) || value === '') {
          this.setState({ checked: true, value });
          break;
        }
        this.setState({ checked: false, value });
        break;
      }
      case 'identityCard': {
        // 身份证校验
        const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if (reg.test(value) || value === '') {
          this.setState({ checked: true, value });
          break;
        }
        this.setState({ checked: false, value });
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
    const { value, isRequired, isEditor, controlShow } = this.state;
    const { entityKey, contentState, children } = this.props;
    const {
      controlID,
      controlName,
      describeVal,
      entityColor,
      dataType
    } = contentState.getEntity(entityKey).getData();

    // 校验文本
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
    const regexpContent = (<p>{dataType.regexpMsg}</p>);
    const stringContent = (<p>请输入普通文本,<span style={{ color: 'red' }}>不能输入数值</span></p>);
    const emailContent = (<p>请输入<span style={{ color: 'red' }}>邮箱地址</span></p>);
    const identityCard = (<p>请输入<span style={{ color: 'red' }}>身份证</span>号码</p>);
    const checkedContent = (
      <span>
        {isRequired && value === '' && requiredContent}
        {dataType.typeVal === 'number' && numberContent}
        {dataType.typeVal === 'string' && stringContent}
        {dataType.typeVal === 'regexp' && regexpContent}
        {dataType.typeVal === 'email' && emailContent}
        {dataType.typeVal === 'identityCard' && identityCard}
      </span>
    );

    // 为真时渲染为输入框
    const textInputContent =
      isEditor
        ?
        (
          <Popover
            placement="top"
            trigger="click"
            content={checkedContent}
          >
            <input
              autoFocus  // eslint-disable-line
              type="text"
              className={styles.editorInput}
              ref={element => this.input = element}
              value={this.state.value}
              onChange={this.onHandleInputChange}
              onBlur={this.onHandleBlur}
            />
          </Popover>
        )
        :
        (<span
          style={{ color: entityColor }}
          className={styles.editorWrapper}
        >
          {value}
        </span>);

    const textInputComponent = controlShow ?
      (
        <span
          className={styles.root}
        >
          <PopupBox
            editorCommand="textInputEditor"
            deleteCommand="textInputDelete"
            controlID={controlID}
            controlName={controlName}
          >
            <span
              className={styles.controlVal}
              title={describeVal}
              onDoubleClick={this.onHandleClick}
            >
              <i className={styles.rim}> [ </i>
              {textInputContent}
              <i className={styles.rim}> ] </i>
              <span style={{ display: 'none' }}>{children}</span>
            </span>
          </PopupBox>
        </span>
      ) :
      null;
    return textInputComponent;
  }
}

export default logicalControlHOC(TextInput);
