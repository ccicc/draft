import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import { PopupBox } from './../../components/Common';
import styles from './index.less';

export default class TextInput extends React.Component {
  static propTypes = {
    entityKey: PropTypes.string,
    children: PropTypes.array,
    contentState: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      update: false,
      value: '',
      checked: true,
      isReuqired: true,
      isEditor: false
    };
  }

  componentWillMount() {
    // 从实体中获取数据并初始化状态
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

  componentDidMount() {
    this.input && this.input.focus();
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
    const { value, isRequired, isEditor } = this.state;
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
    const regexpContent = (<p>{dataType.regexpMsg}</p>);
    const stringContent = (<p>请输入普通文本,<span style={{ color: 'red' }}>不能输入数值</span></p>);
    const emailContent = (<p>请输入<span style={{ color: 'red' }}>邮箱地址</span></p>);
    const identityCard = (<p>请输入<span style={{ color: 'red' }}>身份证</span>号码</p>);
    const hitContent = (
      <span>
        {isRequired && value === '' && requiredContent}
        {dataType.typeVal === 'number' && numberContent}
        {dataType.typeVal === 'string' && stringContent}
        {dataType.typeVal === 'regexp' && regexpContent}
        {dataType.typeVal === 'email' && emailContent}
        {dataType.typeVal === 'identityCard' && identityCard}
      </span>
    );

    const textInputContent = isEditor ?
      (
        <Popover
          placement="top"
          trigger="click"
          content={hitContent}
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
          <i className={styles.rim}> [ </i>
          {textInputContent}
          <i className={styles.rim}> ] </i>
          <span style={{ display: 'none' }}>{children}</span>
        </span>
      </span>
    );
  }
}
