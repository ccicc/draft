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
import styles from './index.less';
// import ColorPicker from './../../../../../Common/ColorPicker';

const FormItem = Form.Item;

class TextInputModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTypeRules: []
    };
  }

  // 动态获取校验规则
  getRules = (dataTypeRules) => {
    const { isRequired } = this.props;
    if (isRequired) {
      dataTypeRules.push({
        required: true, message: '控件值必须填写'
      });
      this.setState({ dataTypeRules });
    } else {
      this.setState({ dataTypeRules });
    }
  }

  render() {
    const {
      // config,
      isVisible,
      // entityColor,
      onModalConfirm,
      onModalCancel,
    } = this.props;
    const { dataTypeRules } = this.state;
    const { getFieldDecorator, validateFields } = this.props.form;

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
                    rules: [{ required: true, message: '必须填写控件值' }],
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
                    rules: dataTypeRules
                  })(<Input size="default" placeholder="请输入控件值" />)
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <FormItem label="是否必填">
                {
                  getFieldDecorator('isRequired', {
                    valuePropName: 'defaultChecked'
                  })(
                    <Switch checkedChildren="是" unCheckedChildren="否" />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="是否只读">
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
      defaultVal: {
        value: props.defaultVal
      },
      describeVal: {
        value: props.describeVal
      },
      dataType: {
        value: props.dataType
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
