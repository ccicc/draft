import React from 'react';
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  Input,
  Select,
  Switch
} from 'antd';
import SelectType from './SelectType';
import ColorPicker from './../../../../../Common/ColorPicker';
import styles from './index.less';

const FormItem = Form.Item;

class TextInputModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequired: true,
      dataTypeRules: [{ required: true, message: '请输入控件值' }]
    };
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

  // 动态获取校验规则
  getRules = (dataTypeRules) => {
    this.setState({
      dataTypeRules
    });
  }

  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const {
      config,
      isVisible,
      onModalConfirm,
      onModalCancel,
    } = this.props;
    const { isRequired, dataTypeRules } = this.state;

    const footer = [
      <Button
        type="primary"
        key="submit"
        onClick={() => validateFields({ force: true }, onModalConfirm)}
      >
        确定
      </Button>,
      <Button
        key="cancel"
        onClick={onModalCancel}
      >
        取消
      </Button>
    ];

    return (
      <Modal
        title="文本输入框"
        visible={isVisible}
        onCancel={onModalCancel}
        footer={footer}
        className={styles.root}
        width={500}
      >
        <Form>
          <Row gutter={15}>
            <Col span={12}>
              <FormItem label="控件ID">
                { getFieldDecorator('controlId')(<Input size="default" disabled />) }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="控件名称" >
                {
                  getFieldDecorator('controlName', {
                    rules: [{ required: true, message: '请填写控件名称' }],
                  })(<Input size="default" placeholder="请输入控件名称" />)
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <FormItem label="标签">
                {
                  getFieldDecorator('tags', {
                    valuePropName: 'defaultValue'
                  })(
                    <Select
                      size="default"
                      allowClear
                      mode="tags"
                      tokenSeparator={[',']}
                      placeholder="多个标签可用逗号分隔"
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="控件描述">
                { getFieldDecorator('describeVal')(<Input size="default" placeholder="请输入与控件描述信息" />) }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <FormItem label="数据类型">
                {
                  getFieldDecorator('dataType', {
                    valuePropName: 'dataType'
                  })(
                    <SelectType
                      isRequired={isRequired}
                      getRules={this.getRules}
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="控件值">
                {
                  getFieldDecorator('defaultVal', {
                    rules: [...dataTypeRules]
                  })(<Input size="default" placeholder="请输入控件值" />)
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label="字体颜色">
                {
                  getFieldDecorator('entityColor', {
                    valuePropName: 'entityColor'
                  })(
                    <ColorPicker
                      config={config}
                    />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <FormItem
                label="是否必填"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 6, offset: 2 }}
              >
                {
                  getFieldDecorator('isRequired', {
                    valuePropName: 'defaultChecked'
                  })(
                    <Switch size="default" checkedChildren="是" unCheckedChildren="否" onChange={this.onSwitchChange} />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="是否只读"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 6, offset: 2 }}
              >
                {
                  getFieldDecorator('isReadOnly', {
                    valuePropName: 'defaultChecked'
                  })(
                    <Switch checkedChildren="是" unCheckedChildren="否" />
                  )
                }
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({
  mapPropsToFields(props) {
    return {
      controlId: {
        value: props.controlId
      },
      controlName: {
        value: props.controlName
      },
      tags: {
        value: props.tags,
      },
      defaultVal: {
        value: props.defaultVal
      },
      describeVal: {
        value: props.describeVal
      },
      dataType: {
        value: props.dataType
      },
      entityColor: {
        value: props.entityColor
      },
      isRequired: {
        value: props.isRequired
      },
      isReadOnly: {
        value: props.isReadOnly
      }
    };
  }
})(TextInputModal);
