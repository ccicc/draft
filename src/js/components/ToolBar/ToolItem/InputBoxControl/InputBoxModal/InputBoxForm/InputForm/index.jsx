import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  Select,
  Input,
  Button,
  Switch,
  Tabs,
  DatePicker
} from 'antd';

import ColorPicker from './../../../../../../Common/ColorPicker';
import SelectType from './SelectType';
import SelectItem from './SelectItem';
import SelectTodo from './SelectTodo';

import styles from './index.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class InputForm extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    controlID: PropTypes.string.isRequired,
    onHandleConfirm: PropTypes.func.isRequired,
    onHandleCancel: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      dateFormat: this.props.dataFormat,
      isRequired: this.props.isRequired,
      dataTypeRules: [],
    };
  }

  onSwitchChange = (checked) => {
    // 是否必填
    this.setState({
      isRequired: checked
    });
  }

  onSetDefaultVal = (value) => {
    // 单选下拉框设置默认值
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ defaultVal: value });
  }

  onAddDefaultVal = (value) => {
    // 多选下拉框添加默认值
    const { getFieldValue, setFieldsValue } = this.props.form;
    const defaultVal = getFieldValue('defaultVal');
    let newDefaultVal = '';
    if (!defaultVal || defaultVal === '未知') {
      newDefaultVal = value;
    } else if (defaultVal.split(',').some(item => item === value)) {
      newDefaultVal = defaultVal;
    } else {
      newDefaultVal = `${defaultVal},${value}`;
    }
    setFieldsValue({ defaultVal: newDefaultVal });
    return newDefaultVal;
  }

  onCleanDefaultVal = () => {
    // 清除输入框默认值
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ defaultVal: '未知' });
  }

  onDateFormatChange = (value) => {
    // 日期格式更改
    this.setState({
      dateFormat: value
    });
  }

  getRules = (dataTypeRules) => {
    // 改变数据类型校验规则
    this.setState({
      dataTypeRules
    });
  }

  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const {
      config,
      controlID,
      defaultVal,
      onHandleConfirm,
      onHandleCancel,
    } = this.props;
    const { dataTypeRules, isRequired, dateFormat } = this.state;

    const ControlID = (
      <FormItem label="控件ID">
        {
          getFieldDecorator('controlID')(<Input disabled size="default" />)
        }
      </FormItem>
    );

    const ControlName = (
      <FormItem label="控件名称">
        {
          getFieldDecorator('controlName')(<Input size="default" placeholder="请填写控件名称" />)
        }
      </FormItem>
    );

    const Tags = (
      <FormItem label="标签">
        {
          getFieldDecorator('tags', { valuePropName: 'defaultValue' })(
            <Select
              allowClear
              size="default"
              mode="tags"
              tokenSeparators={[',']}
              placeholder="多个标签可用逗号分割"
            />
          )
        }
      </FormItem>
    );

    const DescribeVal = (
      <FormItem label="控件描述">
        {getFieldDecorator('describeVal')(
          <Input size="default" placeholder="请输入控件描述信息" />
        )}
      </FormItem>
    );

    const EntityColor = (
      <FormItem label="字体颜色">
        {
          getFieldDecorator('entityColor', { valuePropName: 'entityColor' })(
            <ColorPicker config={config} />
          )
        }
      </FormItem>
    );

    let DefaultVal;

    if (controlID === 'TextInput') {
      DefaultVal = (
        <FormItem label="控件值" className={styles.defaultVal}>
          {
            getFieldDecorator('defaultVal', {
              rules: [
                ...dataTypeRules,
                { required: isRequired, message: '请填写控件值' }
              ]
            })(
              <Input size="default" placeholder="请输入控件值" />
            )
          }
        </FormItem>
      );
    }
    if (controlID === 'SelectionInput' || controlID === 'SelectionMultipleInput') {
      DefaultVal = (
        <FormItem label="控件值" className={styles.defaultVal}>
          {
            getFieldDecorator('defaultVal')(
              <Input
                disabled
                size="default"
                addonAfter={
                  <Button title="清除默认值" size="default" icon="rollback" onClick={this.onCleanDefaultVal} />
                }
              />
            )
          }
        </FormItem>
      );
    }
    if (controlID === 'DateInput') {
      DefaultVal = (
        <FormItem label="控件值">
          {
            getFieldDecorator('defaultVal', {
              rules: [{ required: isRequired, message: '请选择日期时间' }]
            })(
              <DatePicker
                showTime
                size="default"
                style={{ width: '100%' }}
                placeholder="请选择时间"
                format={dateFormat}
              />
            )
          }
        </FormItem>
      );
    }

    const IsRequired = (
      <FormItem
        label="是否必填"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 6, offset: 2 }}
      >
        {
          getFieldDecorator('isRequired', { valuePropName: 'defaultChecked' })(
            <Switch
              size="default"
              checkedChildren="是"
              unCheckedChildren="否"
              onChange={this.onSwitchChange}
            />
          )
        }
      </FormItem>
    );

    const IsReadOnly = (
      <FormItem
        label="是否只读"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 6, offset: 2 }}
      >
        {
          getFieldDecorator('isReadOnly', { valuePropName: 'defaultChecked' })(
            <Switch size="default" checkedChildren="是" unCheckedChildren="否" />
          )
        }
      </FormItem>
    );

    const DataType = (
      <FormItem label="数据类型">
        {
          getFieldDecorator('dataType', { valuePropName: 'dataType' })(
            <SelectType
              isRequired={isRequired}
              getRules={this.getRules}
            />
          )
        }
      </FormItem>
    );

    const SelectItems = (
      <FormItem>
        <Tabs type="card">
          <TabPane tab="自定义选项" key="1">
            {
              getFieldDecorator('selectItems', { valuePropName: 'selectItems' })(
                <SelectItem
                  controlID={controlID}
                  defaultVal={defaultVal}
                  onSetDefaultVal={this.onSetDefaultVal}
                  onAddDefaultVal={this.onAddDefaultVal}
                  onCleanDefaultVal={this.onCleanDefaultVal}
                />
              )
            }
            )
          </TabPane>
        </Tabs>
      </FormItem>
    );

    const SelectTodos = (
      <FormItem>
        <Tabs type="card">
          <TabPane tab="自定义选项" key="1">
            {
              getFieldDecorator('selectTodos', { valuePropName: 'selectTodos' })(
                <SelectTodo
                  controlID={controlID}
                />
              )
            }
          </TabPane>
        </Tabs>
      </FormItem>
    );

    const DateFormat = (
      <FormItem label="日期格式">
        {
          getFieldDecorator('dateFormat', {
            valuePropName: 'defaultValue',
          })(
            <Select
              showSearch
              size="default"
              placeholder="选择日期格式"
              optionFilterprop="children"
              onChange={this.onDateFormatChange}
            >
              <Option key="1" value="YYYY-MM-DD">YYYY-MM-DD</Option>
              <Option key="2" value="YYYY-MM-DD HH:MM">YYYY-MM-DD HH:mm</Option>
              <Option key="3" value="YYYY-MM-DD HH:MM:SS">YYYY-MM-DD HH:mm:ss</Option>
              <Option key="4" value="YYYY/MM/DD">YYYY/MM/DD</Option>
              <Option key="5" value="YYYY/MM/DD HH:MM">YYYY/MM/DD HH:mm</Option>
              <Option key="6" value="YYYY/MM/DD HH:MM:SS">YYYY/MM/DD HH:mm:ss</Option>
              <Option key="7" value="YYYY年MM月DD日 HH:mm:ss">年月日 HH:mm:ss</Option>
            </Select>
          )
        }
      </FormItem>
    );

    // 文本输入框
    const TextInput = (
      <Row gutter={15}>
        <Col span={12}> {ControlID} </Col>
        <Col span={12}> {ControlName} </Col>
        <Col span={12}> {Tags} </Col>
        <Col span={12}> {DescribeVal} </Col>
        <Col span={12}> {DataType} </Col>
        <Col span={12}> {DefaultVal} </Col>
        <Col span={12}> {EntityColor} </Col>
        <Col span={12}> {IsRequired} </Col>
        <Col span={12}> {IsReadOnly} </Col>
      </Row>
    );

    // 下拉单选输入框
    const SelectionInput = (
      <Row gutter={15}>
        <Col span={12}> {ControlID} </Col>
        <Col span={12}> {ControlName} </Col>
        <Col span={12}> {Tags} </Col>
        <Col span={12}> {DescribeVal} </Col>
        <Col span={12}> {EntityColor} </Col>
        <Col span={12}> {DefaultVal} </Col>
        <Col span={24}> {SelectItems} </Col>
      </Row>
    );

    // 下拉多选输入框
    const SelectionMultipleInput = (
      <Row gutter={15}>
        <Col span={12}>{ControlID}</Col>
        <Col span={12}>{ControlName}</Col>
        <Col span={12}>{Tags}</Col>
        <Col span={12}>{DescribeVal}</Col>
        <Col span={12}>{EntityColor}</Col>
        <Col span={12}>{DefaultVal}</Col>
        <Col span={24}>{SelectItems}</Col>
      </Row>
    );

    // 日期输入框
    const DateInput = (
      <Row gutter={15}>
        <Col span={12}>{ControlID}</Col>
        <Col span={12}>{ControlName}</Col>
        <Col span={12}>{Tags}</Col>
        <Col span={12}>{DescribeVal}</Col>
        <Col span={12}>{DateFormat}</Col>
        <Col span={12}>{DefaultVal}</Col>
        <Col span={12}>{EntityColor}</Col>
        <Col span={12}>{IsRequired}</Col>
        <Col span={12}>{IsReadOnly}</Col>
      </Row>
    );

    // 多选输入框
    const CheckBoxInput = (
      <Row gutter={15}>
        <Col span={12}>{ControlID}</Col>
        <Col span={12}>{ControlName}</Col>
        <Col span={12}>{Tags}</Col>
        <Col span={12}>{DescribeVal}</Col>
        <Col span={12}>{EntityColor}</Col>
        <Col span={12}>{IsRequired}</Col>
        <Col span={12}>{IsReadOnly}</Col>
        <Col span={24}>{SelectTodos}</Col>
      </Row>
    );

    // 单选输入框
    const RadioBoxInput = (
      <Row gutter={15}>
        <Col span={12}>{ControlID}</Col>
        <Col span={12}>{ControlName}</Col>
        <Col span={12}>{Tags}</Col>
        <Col span={12}>{DescribeVal}</Col>
        <Col span={12}>{EntityColor}</Col>
        <Col span={12}>{IsRequired}</Col>
        <Col span={12}>{IsReadOnly}</Col>
        <Col span={24}>{SelectTodos}</Col>
      </Row>
    );

    return (
      <div className={styles.root}>
        <Form>
          {this.props.controlID === 'TextInput' && TextInput}
          {this.props.controlID === 'SelectionInput' && SelectionInput}
          {this.props.controlID === 'DateInput' && DateInput}
          {this.props.controlID === 'SelectionMultipleInput' && SelectionMultipleInput}
          {this.props.controlID === 'CheckBoxInput' && CheckBoxInput}
          {this.props.controlID === 'RadioBoxInput' && RadioBoxInput}
          <Button
            key="submit"
            type="primary"
            style={{ marginTop: '15px' }}
            onClick={() => validateFields({ force: true }, onHandleConfirm)}
          >
            确定
          </Button>
          <Button
            key="cancel"
            style={{ marginLeft: '10px' }}
            onClick={onHandleCancel}
          >
            取消
          </Button>
        </Form>
      </div>
    );
  }
}

const WrapperInputForm = Form.create({
  mapPropsToFields(props) {
    let defaultVal;
    if (
      props.controlID === 'SelectionInput' ||
      props.controlID === 'SelectionMultipleInput'
    ) {
      defaultVal = props.defaultVal || '未知';
    } else {
      defaultVal = props.defaultVal;
    }
    return {
      controlID: {
        value: props.controlID
      },
      controlName: {
        value: props.controlName
      },
      tags: {
        value: props.tags
      },
      defaultVal: {
        value: defaultVal
      },
      describeVal: {
        value: props.describeVal
      },
      entityColor: {
        value: props.entityColor
      },
      dataType: {
        value: props.dataType
      },
      isRequired: {
        value: props.isRequired
      },
      isReadOnly: {
        value: props.isReadOnly
      },
      dateFormat: {
        value: props.dateFormat
      },
      selectItems: {
        value: props.selectItems
      },
      selectTodos: {
        value: props.selectTodos
      }
    };
  }
})(InputForm);

export default WrapperInputForm;
