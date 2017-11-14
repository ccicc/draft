import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Input,
  Select,
  Radio,
  DatePicker
} from 'antd';

const InputGroup = Input.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;

export default class ControlCondition extends React.Component {
  static propTypes = {
    logicalOperater: PropTypes.string,
    condition: PropTypes.string, // 判断条件
    itselfEntityKey: PropTypes.string,
    targetEntityKey: PropTypes.string,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    controlConditions: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      condition: this.props.condition, // 判断条件
      logicalOperater: this.props.logicalOperater, // 逻辑运算符
      itselfEntityKey: this.props.itselfEntityKey,
      targetEntityKey: this.props.targetEntityKey,
      customVal: this.props.customVal,
      dateVal: this.props.dateVal,
      inputType: this.props.inputType || 'targetKey'
    };
  }

  onConditionChange = (value) => {
    // 比较条件
    const { index } = this.props;
    this.setState({ condition: value });
    setTimeout(() => this.props.onChange(this.state, index), 0);
  }

  onLogicalChange = (e) => {
    // 逻辑操作符
    const { index } = this.props;
    const { value } = e.target;
    this.setState({ logicalOperater: value });
    setTimeout(() => this.props.onChange(this.state, index), 0);
  }

  onTargetKeyChange = (value) => {
    // 目标实体key值
    const { index } = this.props;
    this.setState({ targetEntityKey: value });
    setTimeout(() => this.props.onChange(this.state, index), 0);
  }

  onItselfKeyChange = (value) => {
    // 自身key值
    const { index } = this.props;
    this.setState({ itselfEntityKey: value });
    setTimeout(() => this.props.onChange(this.state, index), 0);
  }

  onCustomValChange = (e) => {
    // 自定义值
    const { index } = this.props;
    this.setState({ customVal: e.target.value });
    setTimeout(() => this.props.onChange(this.state, index), 0);
  }

  onSelectInputChange = (value) => {
    // 类型选择
    const { index } = this.props;
    this.setState({
      inputType: value
    });
    setTimeout(() => this.props.onChange(this.state, index), 0);
  }

  onDateValChange = (date) => {
    // 目标日期选择
    const { index } = this.props;
    this.setState({
      dateVal: date
    });
    setTimeout(() => this.props.onChange(this.state, index), 0);
  }

  render() {
    const {
      condition,
      logicalOperater,
      itselfEntityKey,
      targetEntityKey,
      inputType,
      customVal,
      dateVal
    } = this.state;
    const { controlID, index, controlConditions, allEntitys } = this.props;
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

    const targetKeyComponent = (
      <Select
        size="small"
        style={{ width: '30%' }}
        value={targetEntityKey}
        placeholder="目标控件,默认为空"
        notFoundContent="没有其他控件"
        onChange={this.onTargetKeyChange}
      >
        {
          allEntitys.map((item, order) => {
            let value = item.value;
            if (moment.isMoment(value)) {
              // 如果值为moment类型，则格式化
              value = moment().format('YYYY-MM-DD HH-mm');
            }
            if (item.type === 'SelectionInput') {
              value = item.value.split(',').filter(val => val !== '未知').join(',');
            }
            if (item.type === 'SelectionMultipleInput') {
              value = item.value.split(',').filter(val => val !== '未知').join(',');
            }
            if (item.type === 'RadioBoxInput') {
              value = item.radioVal;
            }
            if (item.type === 'CheckBoxInput') {
              value = item.checkboxVal.join(',');
            }
            return (
              <Option
                key={`entityKey-${order}`}
                title={`控件名: ${item.title}: 控件值: ${value}`}
                value={item.key}
              >
                {this.props.getInputType(item.type)}: {item.title}
              </Option>
            );
          })
        }
      </Select>
    );

    const customValComponent = (
      <Input
        size="small"
        style={{ width: '30%' }}
        onChange={this.onCustomValChange}
        value={customVal}
      />
    );

    const dateValComponent = (
      <DatePicker
        showTime
        format="YYYY-MM-DD HH:mm"
        placeholder="选择时间"
        style={{ width: '30%' }}
        value={dateVal}
        onChange={this.onDateValChange}
      />
    );

    const selectInputType = (
      <Select
        size="small"
        style={{ width: '20%' }}
        value={inputType}
        onChange={this.onSelectInputChange}
      >
        <Option
          key="1"
          title="输入自定义值"
          value="customVal"
        >
          自定义值
        </Option>
        <Option
          key="2"
          title="选择目标控件"
          value="targetKey"
          disabled={allEntitys.length === 0}
        >
          目标控件
        </Option>
        <Option
          key="3"
          title="选择日期"
          value="dateVal"
          disabled={controlID !== 'DateInput'}
        >
          选择日期
        </Option>
      </Select>
    );

    const itselfComponent = (
      <Select
        showSearch
        allowClear
        size="small"
        mode="combobox"
        style={{ width: '30%' }}
        value={itselfEntityKey}
        placeholder="默认为当前控件值"
        onChange={this.onItselfKeyChange}
      >
        {
          allEntitys.map((item, order) => {
            let value = item.value;
            if (moment.isMoment(value)) {
              // 如果值为moment类型，则格式化
              value = moment().format('YYYY-MM-DD HH-mm');
            }
            if (item.type === 'SelectionInput') {
              value = item.value.split(',').filter(val => val !== '未知').join(',');
            }
            if (item.type === 'SelectionMultipleInput') {
              value = item.value.split(',').filter(val => val !== '未知').join(',');
            }
            if (item.type === 'RadioBoxInput') {
              value = item.radioVal;
            }
            if (item.type === 'CheckBoxInput') {
              value = item.checkboxVal.join(',');
            }
            return (
              <Option
                key={`entityKey-${order}`}
                title={`控件名: ${item.title}: 控件值: ${value}`}
                value={item.key}
              >
                {this.props.getInputType(item.type)} - {item.title}
              </Option>
            );
          })
        }
      </Select>
    );

    return (
      <div>
        <InputGroup
          compact
          size="small"
        >
          {itselfComponent}
          <Select
            size="small"
            style={{ width: '20%' }}
            value={condition}
            onChange={this.onConditionChange}
          >
            <Option value="===">等于</Option>
            <Option value="!==">不等于</Option>
            <Option value="in">包含</Option>
            <Option value="not">不包含</Option>
            <Option value=">">大于</Option>
            <Option value="<">小于</Option>
            <Option value=">=">大于等于</Option>
            <Option value="<=">小于等于</Option>
          </Select>
          {inputType === 'targetKey' && targetKeyComponent}
          {inputType === 'customVal' && customValComponent}
          {inputType === 'dateVal' && dateValComponent}
          {selectInputType}
        </InputGroup>
        {operaterContent}
      </div>
    );
  }
}
