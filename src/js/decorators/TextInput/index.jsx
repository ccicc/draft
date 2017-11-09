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
      value: '', // 文本控件值
      checked: true, // 是否校验
      isReuqired: true,
      isEditor: false,
      controlShow: true // 逻辑质控
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
    this.onLogicalControlJudge();
  }

  componentWillReceiveProps(nextProps) {
    const { entityKey, contentState } = nextProps;
    if (contentState !== this.contentState) {
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
      setTimeout(() => this.onLogicalControlJudge(), 0);
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
    this.onLogicalControlJudge();
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

  onLogicalControlJudge = () => {
    const { value } = this.state;
    const { entityKey, contentState } = this.props;
    const { logicalControl } = contentState.getEntity(entityKey).getData();
    // 逻辑质控
    let result;
    if (logicalControl) {
      const { controlConditions, isShow, targetKeys } = logicalControl;
      const expression = controlConditions.reduce((total, item, index, current) => {
        if (current.length !== 1 && (index !== current.length - 1)) {
          const judgeVal = item.judgeVal === '' ? ' ' : item.judgeVal;
          return `${total} '${value}' ${item.condition} '${judgeVal}' ${item.logicalOperater}`;
        }
        return `${total} '${value}' ${item.condition} '${item.judgeVal}'`;
      }, '');
      result = eval(expression);  // eslint-disable-line
      console.log(`result: ${result}`);
      if (result) {
        // 满足质控条件
        targetKeys.forEach(key => {
          this.onModifyEntityData(key, isShow);
          console.log(`conditionTrue: ${key}, ${isShow}`);
        });
      } else {
        const newDisplay = isShow === 'show' ? 'hidden' : 'show';
        targetKeys.forEach(key => {
          this.onModifyEntityData(key, newDisplay);
          console.log(`conditionFalse: ${key}, ${newDisplay}`);
        });
      }
    }
    this.setState({ update: true });
  }

  onModifyEntityData = (entityKey, isShow) => {
    // 逻辑质控, 更改目标控件实体数据controlShow,实现显示，隐藏
    const { contentState } = this.props;
    const otherEntityData = contentState.getEntity(entityKey).getData();
    contentState.replaceEntityData(
      entityKey,
      {
        ...otherEntityData,
        controlShow: isShow
      }
    );
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
    console.log(controlShow);
    return textInputComponent;
  }
}
