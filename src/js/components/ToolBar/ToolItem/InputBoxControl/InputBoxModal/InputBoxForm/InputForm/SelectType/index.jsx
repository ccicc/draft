import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

export default class SelectType extends React.Component {
  static propTypes = {
    getRules: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      checkRules: [],
      dataType: this.props.dataType
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
          checkRules: [{ pattern: /^\d+$/, message: '只能输入数值' }],
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

  render() {
    const { dataType } = this.state;
    const Option = Select.Option;

    return (
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
    );
  }
}
