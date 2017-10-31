import React from 'react';
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
      dataType: this.props.dataType,
      minNum: 0,
      maxNum: 100
    };
  }

  onHandleChange = (typeVal) => {
    const { checkRules } = this.state;
    this.setState({
      dataType: typeVal
    });
    switch (typeVal) {
      case 'string':
        this.setState({
          checkRules: [{ type: 'string', message: '只能输入普通文本' }],
        });
        break;
      case 'number':
        this.setState({
          checkRules: this.onNumberCheckRules()
        });
        break;
      case 'email':
        this.setState({
          checkRules: [{ type: 'email', message: '输入的数据不符合邮件格式' }],
        });
        break;
      case 'identityCard':
        this.setState({
          checkRules: [
            {
              pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
              message: '输入的身份证格式错误'
            }
          ],
        });
        break;
      default:
        return checkRules;
    }
    setTimeout(() => {
      let { checkRules } = this.state;  // eslint-disable-line
      this.props.getRules(checkRules);
      this.props.onChange(typeVal);
    });
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
      }
    ];
    this.props.getRules(numberCheckRules);
    this.setState({
      checkRules: numberCheckRules
    });
    return numberCheckRules;
  }

  onMinNumChange = (e) => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({
        minNum: value
      });
    }
    setTimeout(() => this.onNumberCheckRules(), 0);
  }

  onMaxNumChange = (e) => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9])?$/;
    if (
      (!Number.isNaN(value) && reg.test(value)) ||
      value === '' ||
      value === '-'
    ) {
      this.setState({
        maxNum: value
      });
    }
    setTimeout(() => this.onNumberCheckRules(), 0);
  };

  render() {
    const { dataType, minNum, maxNum } = this.state;
    const Option = Select.Option;

    return (
      <div>
        <Select
          showSearch
          size="default"
          value={dataType}
          optionFilterProp="children"
          onSelect={(value) => this.onHandleChange(value)}
        >
          <Option value="string">普通文本</Option>
          <Option value="number">数值</Option>
          <Option value="email">邮箱地址</Option>
          <Option value="identityCard">身份证号码</Option>
        </Select>
        {
          dataType === 'number' &&
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
      </div>
    );
  }
}
