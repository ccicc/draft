import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Select,
  Radio
} from 'antd';

const InputGroup = Input.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;

export default class ControlCondition extends React.Component {
  static propTypes = {
    condition: PropTypes.string,
    judgeVal: PropTypes.string,
    logicalOperater: PropTypes.string,
    defaultVal: PropTypes.string,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      condition: this.props.condition, // 判断条件
      judgeVal: this.props.judgeVal, // 判断值
      logicalOperater: this.props.logicalOperater // 逻辑运算符
    };
  }

  onConditionChange = (value) => {
    const { index } = this.props;
    this.setState({ condition: value });
    setTimeout(() => this.props.onChange(this.state, index), 0);
  }

  onJudgeValChange = (e) => {
    const { index } = this.props;
    const { value } = e.target;
    this.setState({ judgeVal: value });
    setTimeout(() => this.props.onChange(this.state, index), 0);
  }

  onLogicalChange = (e) => {
    const { index } = this.props;
    const { value } = e.target;
    this.setState({ logicalOperater: value });
    setTimeout(() => this.props.onChange(this.state, index));
  }

  render() {
    const { condition, judgeVal, logicalOperater } = this.state;
    const { index, defaultVal, controlConditions } = this.props;

    let operaterContent = null;
    if (
      (controlConditions.length !== 1) &&
      (index !== controlConditions.length - 1)
    ) {
      operaterContent = (
        <RadioGroup
          size="small"
          value={logicalOperater}
          onChange={this.onLogicalChange}
        >
          <Radio value="&&">并且</Radio>
          <Radio value="||">或者</Radio>
        </RadioGroup>
      );
    }

    return (
      <div>
        <InputGroup
          compact
          size="small"
        >
          <Input
            disabled
            style={{ width: '40%' }}
            placeholder="当前控件值"
            value={defaultVal}
          />
          <Select
            size="small"
            style={{ width: '20%' }}
            value={condition}
            onChange={this.onConditionChange}
          >
            <Option value="===">等于</Option>
            <Option value="!==">不等于</Option>
            <Option value=">">大于</Option>
            <Option value="<">小于</Option>
            <Option value=">=">大于等于</Option>
            <Option value="<=">小于等于</Option>
          </Select>
          <Input
            style={{ width: '40%' }}
            value={judgeVal}
            placeholder="输入判断值"
            onChange={this.onJudgeValChange}
          />
        </InputGroup>
        {operaterContent}
      </div>
    );
  }
}
