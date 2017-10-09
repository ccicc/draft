import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button,
  Col
} from 'antd';

const FormItem = Form.Item;

class LinkImage extends React.Component {
  static propTypes = {
    onHandleConfirm: PropTypes.func.isRequired,
    onHandleCancel: PropTypes.func.isRequired
  };

  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const { onHandleConfirm, onHandleCancel } = this.props;
    return (
      <Form>
        <FormItem>
          {
            getFieldDecorator('imageUrl', {
              rules: [{ required: true, message: '图片链接不能为空' }]
            })(
              <Input
                placeholder="图片链接地址"
                prefix={<i className="fa fa-link fa-lg" />}
              />
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('imageAlt')(
              <Input
                placeholder="图片描述"
                prefix={<i className="fa fa-info fa-lg" />}
              />
            )
          }
        </FormItem>
        <Input.Group>
          <Col span={12}>
            <FormItem>
              {
                getFieldDecorator('imageWidth')(
                  <Input
                    placeholder="图片宽度"
                    prefix={<i className="fa fa-arrows-h fa-lg" />}
                  />
                )
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              {
                getFieldDecorator('imageHeight')(
                  <Input
                    placeholder="图片高度"
                    prefix={<i className="fa fa-arrows-v fa-lg" />}
                  />
                )
              }
            </FormItem>
          </Col>
        </Input.Group>
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

const WrapperLinkImage = Form.create()(LinkImage);

export default WrapperLinkImage;
