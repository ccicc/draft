import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button
} from 'antd';
import katex from 'katex';
import styles from './index.less';

const FormItem = Form.Item;
class CustomEquation extends React.Component {
  static propTypes = {
    onCustomEquationConfirm: PropTypes.func.isRequired,
    onHandleCancel: PropTypes.func.isRequired
  };

  onPreviewEquation = (e) => {
    const equationData = `${e.target.value}`;
    katex.render(
      equationData,
      this.equationContainer
    );
  }

  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const { onCustomEquationConfirm, onHandleCancel } = this.props;

    return (
      <Form>
        <FormItem>
          {
            getFieldDecorator('customEquation', {
              rules: [{ required: true, message: '输入的公式不能为空' }]
            })(
              <Input.TextArea
                rows={4}
                onChange={this.onPreviewEquation}
              />
            )
          }
        </FormItem>
        <div
          ref={element => this.equationContainer = element}
          className={styles.equationPreview}
        />
        <Button
          type="primary"
          onClick={() => validateFields({ force: true }, onCustomEquationConfirm)}
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

const WrapperCustomEquation = Form.create()(CustomEquation);

export default WrapperCustomEquation;
