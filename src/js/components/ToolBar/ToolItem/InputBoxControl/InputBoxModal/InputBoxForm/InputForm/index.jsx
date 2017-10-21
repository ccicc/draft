/* eslint-disable */
import React from 'react';
import {
  Row,
  Col,
  Form,
  Select,
  Input,
  Button
} from 'antd';

const FormItem = Form.Item;

class InputForm extends React.Component {
  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const { onHandleConfirm, onHandleCancel } = this.props;

    return (
      <div>
        <Form>
          <Row gutter={15}>
            <Col span={12}>
              <FormItem label="控件ID">
                {
                  getFieldDecorator('controlID')(
                    <Input disabled size="default" />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="控件名称">
                {
                  getFieldDecorator('controlName')(
                    <Input size="default" placeholder="请填写控件名称" />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Button 
            type="primary"
            key="submit"
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
      }
    }
  }
})(InputForm);

export default WrapperInputForm;
