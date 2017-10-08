/* eslint-disable */

import React from 'react';
import {
  Tabs,
  Form,
  Upload,
  Input,
  Icon,
  Button
} from 'antd';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Dragger = Upload.Dragger;

import styles from './index.less';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
  }

  onHandleChange = (file) => {
    console.log(file);
  }

  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const { onHandleConfirm, onHandleCancel } = this.props;

    return (
      <div>
        <Tabs>
          <TabPane tab="本地上传" key="1">
            <Form>
              <FormItem>
                {
                  getFieldDecorator('image')(
                    <div style={{ marginTop: '10px' }}>
                      <Dragger
                        name="image"
                        action="//jsonplaceholder.typicode.com/posts/"
                        onChange={this.onHandleChange}
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
              <Button
                type="primary"
                onClick={onHandleConfirm}
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
          </TabPane>
          <TabPane tab="链接地址" key="2">
            <Form>
              <FormItem
                label="图片链接地址"
              >
                {
                  getFieldDecorator('imageUrl', {
                    rules: [{ required: true, message: '请输入链接地址' }]
                  })(
                    <Input size="default" />
                    )
                }
              </FormItem>
              <FormItem
                label="图片描述"
              >
                {
                  getFieldDecorator('imageAlt')(
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
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const WrapperImageUpload = Form.create()(ImageUpload);

export default WrapperImageUpload;
