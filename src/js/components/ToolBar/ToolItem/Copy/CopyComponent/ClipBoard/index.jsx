import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button
} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class ClipBoard extends React.Component {
  static propTypes = {
    onHandleConfirm: PropTypes.func.isRequired,
    onHandleCancel: PropTypes.func.isRequired
  };

  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const { onHandleConfirm, onHandleCancel } = this.props;

    return (
      <Form>
        <FormItem label="需要粘贴的文本">
          {
            getFieldDecorator('clipText', {
              rules: [
                { required: true, message: '需要粘贴的文本不能为空' }
              ]
            })(
              <TextArea rows={4} />
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

const WrapperClipBoard = Form.create({
  mapPropsToFields(props) {
    return {
      clipText: {
        value: props.currentText
      }
    };
  }
})(ClipBoard);

export default WrapperClipBoard;
