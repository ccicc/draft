/* eslint-disable */
import React from 'react';
import {
  Row,
  Col,
  Form,
  Select,
  Input,
  Button,
  Switch
} from 'antd';

import ColorPicker from './../../../../../../Common/ColorPicker';
import SelectType from './SelectType';

import styles from './index.less';

const FormItem = Form.Item;
class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequired: true,
      dataTypeRules: [{ required: true, message: '请输入控件值' }]
    }
  }

  onSwitchChange = (checked) => {
    const { dataTypeRules } = this.state;
    const newRules = dataTypeRules.map(item => {
      if (item.required !== undefined) {
        item.required = checked
      }
      return item;
    });
    this.setState({
      dataTypeRules: newRules,
      isRequired: checked
    });
  }

  getRules = (dataTypeRules) => {
    this.setState({
      dataTypeRules
    });
  }

  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const { config, onHandleConfirm, onHandleCancel } = this.props;
    const { dataTypeRules, isRequired } = this.state;

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

    const DefaultVal = (
      <FormItem label="控件值">
        {
          getFieldDecorator('defaultVal', {
            rules: [...dataTypeRules]
          })(
            <Input size="default" placeholder="请输入控件值" />
          )
        }
      </FormItem>
    );

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
      </Row>
    );

    return (
      <div className={styles.root}>
        <Form>
          { this.props.controlID === 'TextInput' && TextInput }
          { this.props.controlID === 'SelectionInput' && SelectionInput }
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
    )
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
      }
    };
  }
})(InputForm);

export default WrapperInputForm;
