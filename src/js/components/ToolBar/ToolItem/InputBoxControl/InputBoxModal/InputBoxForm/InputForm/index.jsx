import React from 'react';
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

import styles from './index.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequired: true,
      dataTypeRules: [{ required: true, message: '请输入控件值' }],
      dateFormat: 'YYYY-MM-DD HH:mm'
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isRequired, dateFormat } = nextProps;
    if (
      isRequired && isRequired !== this.props.isRequired &&
      dateFormat && dateFormat !== this.props.dateFormat
    ) {
      this.setState({
        isRequired,
        dateFormat
      });
    }
  }

  onSwitchChange = (checked) => {
    const { dataTypeRules } = this.state;
    const newRules = dataTypeRules.map(item => {
      if (item.required !== undefined) {
        item.required = checked;
      }
      return item;
    });
    this.setState({
      dataTypeRules: newRules,
      isRequired: checked
    });
  }

  onSetDefaultVal = (value) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ defaultVal: value });
  }

  onCleanDefaultVal = () => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ defaultVal: '未知' });
  }

  onDateFormatChange = (value) => {
    this.setState({
      dateFormat: value
    });
  }

  getRules = (dataTypeRules) => {
    this.setState({
      dataTypeRules
    });
  }

  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const { config, controlID, onHandleConfirm, onHandleCancel } = this.props;
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
              size="default"
              allowClear
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
              rules: [...dataTypeRules]
            })(
              <Input size="default" placeholder="请输入控件值" />
            )
          }
        </FormItem>
      );
    } else if (controlID === 'SelectionInput') {
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
    } else if (controlID === 'DateInput') {
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
              getFieldDecorator('selectItems', {
                valuePropsName: 'selectItems'
              })(
                <SelectItem
                  onSetFieldsValue={this.onSetDefaultVal}
                />
              )
            };
          </TabPane>
        </Tabs>
      </FormItem>
    );

    const DateFormat = (
      <FormItem label="日期格式">
        {
          getFieldDecorator('dateFormat', {
            valuePropsName: 'dateFormat',
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
            </Select>
          )
        }
      </FormItem>
    );

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

    return (
      <div className={styles.root}>
        <Form>
          {this.props.controlID === 'TextInput' && TextInput}
          {this.props.controlID === 'SelectionInput' && SelectionInput}
          {this.props.controlID === 'DateInput' && DateInput}
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
        value: props.defaultVal
      },
      describeVal: {
        value: props.describeVal
      },
      entityColor: {
        value: props.entityColor || '#333'
      },
      dataType: {
        value: props.dataType || '普通文本'
      },
      isRequired: {
        value: props.isRequired || true
      },
      isReadOnly: {
        value: props.isReadOnly || false
      },
      selectItems: {
        value: props.selectItems || []
      },
      dateFormat: {
        value: props.dateFormat
      }
    };
  }
})(InputForm);

export default WrapperInputForm;
