/* eslint-disable */ 
import React from 'react';
import { 
  Modal,
  Button,
  Form,
  Row,
  Col,
  Input,
  Select
} from 'antd';

import ColorPicker from './../../../../../Common/ColorPicker';

const FormItem = Form.Item;
class DateInputModal extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {   
    const {
      config,
      isVisible,
      onHandleConfirm,
      onHandleCancel
    } = this.props;

    const { getFieldDecorator } = this.props.form;

    const footer = [
      <Button
        key="confirm"
        type="primary"
        onClick={onHandleConfirm}
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
        title="日期输入框"
        visible={isVisible}
        footer={footer}
        onCancel={onHandleCancel}
        width={500}
      >
        <Form>
          <Row gutter={15}>
            <Col span={12}>
              <FormItem label="控件ID">
                { getFieldDecorator('controlId')(
                  <Input size="default" disabled/>
                ) }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="控件名称">
                {
                  getFieldDecorator('controlName')(
                    <Input size="default" placeholder="请输入控件名称"/>
                  )
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
                      placeholder="多个标签可用逗号分割"
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="控件描述">
                { getFieldDecorator('describeVal')(
                  <Input size="default" placeholder="请输入控件描述信息" />
                ) }
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
                    <ColorPicker config={config} />
                  )
                }
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({
  mapPropsToFields(props){
    
  }
})(DateInputModal);
