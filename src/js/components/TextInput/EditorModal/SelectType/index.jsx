import React from 'react';
import { Select } from 'antd';

export default class SelectType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkRules: []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props || nextState !== this.state) return true;
    return false;
  }

  onHandleChange = (typeVal) => {
    this.props.onSelectType(typeVal);
    const { checkRules } = this.state;
    switch (typeVal) {
      case 'string':
        this.setState({
          checkRules: [
            { required: true, message: '控件的值不能为空' },
            { type: 'string', message: '只能输入普通的文本数据' }
          ]
        });
        break;
      case 'number':
        this.setState({
          checkRules: [
            { required: true, message: '控件的值不能为空' },
            { pattern: /^\d+$/, message: '请输入数值' }
          ]
        });
        break;
      case 'email':
        this.setState({
          checkRules: [
            { required: true, message: '控件的值不能为空' },
            { type: 'email', message: '输入的数据不符合电子邮件格式' }
          ]
        });
        break;
      case 'identityCard':
        this.setState({
          checkRules: [
            { required: true, message: '控件的值不能为空' },
            {
              pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
              message: '输入的身份证格式错误'
            }
          ]
        });
        break;
      default:
        return checkRules;
    }
    setTimeout(() => {
      this.props.getRules(this.state.checkRules);
    });
  }

  render() {
    const { dataType } = this.props;
    const Option = Select.Option;
    console.log('render SelectType');
    return (
      <div>
        <Select
          size="large"
          showSearch
          defaultValue={dataType}
          optionFilterProp="children"
          onSelect={(value) => this.onHandleChange(value)}
        >
          <Option value="string">普通文本</Option>
          <Option value="number">数值</Option>
          <Option value="email">邮箱地址</Option>
          <Option value="identityCard">身份证号码</Option>
        </Select>
      </div>
    );
  }
}
