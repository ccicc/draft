/* eslint-disable */

import React from 'react';
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Select,
  Input,
  Icon,
  Tabs
} from 'antd';

import ColorPicker from './../../../../../Common/ColorPicker';
import SelectItem from './SelectItem';
import styles from './index.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class SelectionInputModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const {
      config,
      isVisible,
      entityColor,
      onChangeEntityColor,
      onChangeSelectItems,
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
                    rules: [{ required: true, message: '请填写控件名称' }]
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
                <ColorPicker
                  config={config}
                  entityColor={entityColor}
                  onSelectEntityColor={onChangeEntityColor}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="控件值">
                {
                  getFieldDecorator('defaultVal')(
                    <div className={styles.defaultVal}>
                      <Input
                        style={{ color: `${entityColor}` }}
                        size="default" disabled
                        placeholder="选择控件值"
                        addonAfter={<Button title="返回默认值" size="default" icon="rollback" />}
                      />
                    </div>
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
                        <SelectItem />
                        )
                    }
                  </TabPane>
                </Tabs>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
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
      selectItems: {
        value: props.selectItems
      }
    }
  }
})(SelectionInputModal);
