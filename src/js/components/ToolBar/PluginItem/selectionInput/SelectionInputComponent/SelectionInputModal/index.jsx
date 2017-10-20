import React from 'react';
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Select,
  Input,
  Tabs
} from 'antd';

import ColorPicker from './../../../../../Common/ColorPicker';
import SelectItem from './SelectItem';
import styles from './index.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class SelectionInputModal extends React.Component {
  onSetDefaultVal = (value) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ defaultVal: value });
  }

  onCleanDefaultVal = () => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ defaultVal: '未知' });
  }

  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const {
      config,
      isVisible,
      onHandleConfirm,
      onHandleCancel
    } = this.props;

    const footer = [
      <Button
        type="primary"
        key="submit"
        onClick={() => validateFields({ force: true }, onHandleConfirm)}
      >
        确定
      </Button>,
      <Button
        key="cancel"
        onClick={onHandleCancel}
      >
        取消
      </Button>
    ];

    return (
      <Modal
        title="下拉单选输入框"
        visible={isVisible}
        footer={footer}
        onCancel={onHandleCancel}
        className={styles.root}
        width={500}
      >
        <Form>
          <Row gutter={15}>
            <Col span={12}>
              <FormItem label="控件ID">
                {
                  getFieldDecorator('controlId')(<Input disabled size="default" />)
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="控件名称">
                {
                  getFieldDecorator('controlName', {
                  })(<Input size="default" placeholder="请填写控件名称" />)
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
                      placeholder="多个标签可用逗号隔开"
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="控件描述">
                {
                  getFieldDecorator('describeVal')(
                    <Input size="default" placeholder="请输入控件描述" />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
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
            <Col span={12}>
              <FormItem label="控件值" className={styles.defaultVal}>
                {
                  getFieldDecorator('defaultVal')(
                    <Input
                      disabled
                      size="default"
                      placeholder="选择控件值"
                      addonAfter={
                        <Button
                          title="清除默认值"
                          size="default"
                          icon="rollback"
                          onClick={this.onCleanDefaultVal}
                        />
                      }
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem>
                <Tabs type="card">
                  <TabPane tab="自定义选项" key="1">
                    {
                      getFieldDecorator('selectItems', {
                        valuePropName: 'selectItems'
                      })(
                        <SelectItem
                          onSetFieldsValue={this.onSetDefaultVal}
                        />
                      )
                    }
                  </TabPane>
                </Tabs>
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
        value: props.controlId,
      },
      controlName: {
        value: props.controlName,
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
      entityColor: {
        value: props.entityColor
      },
      selectItems: {
        value: props.selectItems
      }
    };
  }
})(SelectionInputModal);
