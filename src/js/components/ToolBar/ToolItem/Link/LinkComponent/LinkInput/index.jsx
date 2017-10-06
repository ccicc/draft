import React from 'react';
import {
  Button,
  Form,
  Input,
  Radio
} from 'antd';

const FormItem = Form.Item;

class LinkInput extends React.Component {
  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const { onHandleConfirm, onHandleCancel } = this.props;

    return (
      <Form layout="horizontal">
        <FormItem label="链接文本" >
          {
            getFieldDecorator('title', {
              rules: [
                { required: true, message: '请填写链接文本' }
              ]
            })(
              <Input placeholder="输入链接文本" />
            )
          }
        </FormItem>
        <FormItem label="链接地址">
          {
            getFieldDecorator('url', {
              rules: [
                { required: true, message: '请填写链接地址' }
              ]
            })(
              <Input placeholder="以 http:// 或 https:// 开头" />
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('target')(
              <Radio.Group name="linkTarget">
                <Radio value="_blank">在新窗口打开链接</Radio>
                <Radio value="_self">在当前窗口打开链接</Radio>
              </Radio.Group>
            )
          }
        </FormItem>
        <Button
          type="primary"
          onClick={() => validateFields({ force: true }, onHandleConfirm)}
        >
          创建
        </Button>
        <Button
          style={{ marginLeft: '10px' }}
          onClick={onHandleCancel}
        >
          取消
        </Button>
      </Form>
    );
  }
}

const WrapperLinkInput = Form.create({
  mapPropsToFields(props) {
    return {
      title: {
        value: props.title
      },
      url: {
        value: props.url
      },
      target: {
        value: props.target
      }
    };
  }
})(LinkInput);

export default WrapperLinkInput;
