import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Input
} from 'antd';

const FormItem = Form.Item;

class PostilInput extends React.Component {
  static propTypes = {
    onHandleConfirm: PropTypes.func.isRequired,
    onHandleCancel: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
  };

  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const { onHandleConfirm, onHandleCancel } = this.props;
    return (
      <Form>
        <FormItem label="当前选中文本">
          {
            getFieldDecorator('entityText', {
              rules: [{ required: true, message: '当前未选中文本' }]
            })(
              <Input size="default" />
            )
          }
        </FormItem>
        <FormItem label="批注文本">
          {
            getFieldDecorator('postilText', {
              rules: [{ required: true, message: '批注不能为空' }]
            })(
              <Input size="default" />
            )
          }
        </FormItem>
        <Button
          type="primary"
          onClick={() => validateFields({ force: true }, onHandleConfirm)}
        >
          确定
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

const WrapperPostilInput = Form.create({
  mapPropsToFields(props) {
    return {
      entityText: {
        value: props.entityText,
      },
      postilText: {
        value: props.postilText
      }
    };
  }
})(PostilInput);

export default WrapperPostilInput;
