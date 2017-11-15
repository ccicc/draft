import React from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import {
  Select,
  Row,
  Col,
  Input,
  Icon
} from 'antd';

export default class SelectType extends React.Component {
  static propTypes = {
    getRules: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      checkRules: [],
      typeVal: this.props.dataType.typeVal,
      minNum: this.props.dataType.minNum,
      maxNum: this.props.dataType.maxNum,
      regexp: this.props.dataType.regexp,
      regexpMsg: this.props.dataType.regexpMsg
    };
  }

  componentDidMount() {
    // 初始化时的数据校验类型
    this.onHandleChange(this.props.dataType.typeVal);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};
    const thisState = this.state || {};
    if (
      Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length
    ) {
      return true;
    }
    for (const key in nextProps) {
      if (nextProps.hasOwnProperty(key) && !is(thisProps[key], nextProps[key])) {
        return true;
      }
    }
    for (const key in nextState) {
      if (nextState.hasOwnProperty(key) && !is(thisState[key], nextState[key])) {
        return true;
      }
    }
    return false;
  }

  onHandleChange = (typeVal) => {
    const { checkRules } = this.state;
    switch (typeVal) {
      case 'string':
        this.setState({
          typeVal: 'string',
          checkRules: [{
            pattern: /^[\D]+$/,
            message: '请输入普通文本,不能包含数值'
          }],
        });
        break;
      case 'number':
        this.setState({
          typeVal: 'number',
          checkRules: this.onNumberCheckRules()
        });
        break;
      case 'email':
        this.setState({
          typeVal: 'email',
          checkRules: [{ type: 'email', message: '输入的数据不符合邮件格式' }],
        });
        break;
      case 'identityCard':
        this.setState({
          typeVal: 'identityCard',
          checkRules: [
            {
              pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
              message: '输入的身份证格式错误'
            }
          ],
        });
        break;
      case 'regexp':
        this.setState({
          typeVal: 'regexp',
          checkRules: this.onRegexpCheckRules()
        });
        break;
      default:
        return checkRules;
    }
    setTimeout(() => {
      let { checkRules } = this.state;  // eslint-disable-line
      this.props.getRules(checkRules);
      this.props.onChange({
        typeVal: this.state.typeVal,
        minNum: this.state.minNum,
        maxNum: this.state.maxNum
      });
    }, 0);
  }

  onNumberCheckRules = () => {
    // 数值校验规则
    const { minNum, maxNum } = this.state;
    const numberCheckRules = [
      {
        message: `请输入与${minNum || 0}到${maxNum || 100}之间的数值`,
        validator: (rules, value, callback) => {
          if (Number.parseInt(value, 10) < minNum || Number.parseInt(value, 10) > maxNum) {
            callback('输入数值超出范围');
          }
          callback();
        }
      },
      {
        pattern: /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/,
        message: '请输入数值'
      }
    ];
    this.props.getRules(numberCheckRules);
    this.setState({
      checkRules: numberCheckRules
    });
    return numberCheckRules;
  }

  onRegexpCheckRules = () => {
    // 自定义正则校验
    const { regexp, regexpMsg } = this.state;
    const regexpCheckRules = [
      {
        message: regexpMsg,
        pattern: regexp.split('/')[1]
      }
    ];
    this.props.getRules(regexpCheckRules);
    this.setState({
      checkRules: regexpCheckRules
    });
    return regexpCheckRules;
  }

  onMinNumChange = (e) => {
    // 最小值受控
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({
        minNum: Number.parseInt(value, 10)
      });
    }
    setTimeout(() => {
      this.onNumberCheckRules();
      this.props.onChange({
        typeVal: this.state.typeVal,
        minNum: this.state.minNum,
        maxNum: this.state.maxNum
      });
    }, 0);
  }

  onMaxNumChange = (e) => {
    // 最大值受控
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9])?$/;
    if (
      (!Number.isNaN(value) && reg.test(value)) ||
      value === '' ||
      value === '-'
    ) {
      this.setState({
        maxNum: Number.parseInt(value, 10)
      });
    }
    setTimeout(() => {
      this.onNumberCheckRules();
      this.props.onChange({
        typeVal: this.state.typeVal,
        minNum: this.state.minNum,
        maxNum: this.state.maxNum
      });
    }, 0);
  };

  onRegexpChange = (e) => {
    // 自定义正则受控
    const { value } = e.target;
    this.setState({
      regexp: value
    });
    setTimeout(() => {
      this.onRegexpCheckRules();
      this.props.onChange({
        regexp: this.state.regexp,
        regexpMsg: this.state.regexpMsg,
        typeVal: this.state.typeVal
      });
    }, 0);
  }

  onRegexpMsgChange = (e) => {
    // 正则提示信息受控
    const { value } = e.target;
    this.setState({
      regexpMsg: value
    });
    setTimeout(() => {
      this.onRegexpCheckRules();
      this.props.onChange({
        regexp: this.state.regexp,
        regexpMsg: this.state.regexpMsg,
        typeVal: this.state.typeVal
      });
    }, 0);
  }

  render() {
    const { typeVal, minNum, maxNum, regexp, regexpMsg } = this.state;
    const Option = Select.Option;

    return (
      <div>
        <Select
          showSearch
          size="default"
          value={typeVal}
          optionFilterProp="children"
          onSelect={(value) => this.onHandleChange(value)}
        >
          <Option value="string">普通文本</Option>
          <Option value="number">数值</Option>
          <Option value="email">邮箱地址</Option>
          <Option value="identityCard">身份证号码</Option>
          <Option value="regexp">正则表达式</Option>
        </Select>
        {
          typeVal === 'number' &&
          <Row
            gutter={10}
          >
            <Col span={12}>
              <Input
                size="small"
                title="最小值"
                placeholder="最小值,0"
                value={minNum}
                prefix={<Icon type="arrow-down" />}
                onChange={this.onMinNumChange}
              />
            </Col>
            <Col span={12}>
              <Input
                size="small"
                title="最大值"
                placeholder="最大值,100"
                value={maxNum}
                prefix={<Icon type="arrow-up" />}
                onChange={this.onMaxNumChange}
              />
            </Col>
          </Row>
        }
        {
          typeVal === 'regexp' &&
          <Row gutter={10}>
            <Col span={24}>
              <Input
                size="default"
                title="自定义正则表达式"
                placeholder="请输入自定义正则表达式"
                value={regexp}
                prefix={<Icon type="check" />}
                onChange={this.onRegexpChange}
              />
            </Col>
            <Col span={24}>
              <Input
                size="default"
                title="提示信息"
                placeholder="请输入错误提示信息"
                value={regexpMsg}
                prefix={<Icon type="exclamation-circle-o" />}
                onChange={this.onRegexpMsgChange}
              />
            </Col>
          </Row>
        }
      </div>
    );
  }
}
