import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Input,
  Upload,
  Col
} from 'antd';

import styles from './index.less';

const FormItem = Form.Item;
const Dragger = Upload.Dragger;

class LocalImage extends React.Component {
  static propTypes = {
    onHandleConfirm: PropTypes.func.isRequired,
    onHandleCancel: PropTypes.func.isRequired
  };

  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const { onHandleConfirm, onHandleCancel } = this.props;

    return (
      <Form layout="horizontal">
        <FormItem>
          {
            getFieldDecorator('imageUrl', {
              rules: [{ required: true, message: '请选择上传的图片' }]
            })(
              <div style={{ marginTop: '10px' }}>
                <Dragger
                  name="image"
                  action="//jsonplaceholder.typicode.com/posts/"
                >
                  <p className={styles.icon}>
                    <i className="fa fa-image" />
                  </p>
                  <p>点击或拖动图片到此区域上传</p>
                </Dragger>
              </div>
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('imageAlt')(
              <Input
                prefix={<i className="fa fa-info fa-lg" />}
                placeholder="请输入图片描述"
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

const WrapperLocalImage = Form.create()(LocalImage);

export default WrapperLocalImage;
