/* eslint-disable */

import React from 'react';
import {
  Popover,
  Button,
  Form,
  Input,
  Radio
} from 'antd';
import classnames from 'classnames';

const FormItem = Form.Item;

class LinkInput extends React.Component {
  constructor(props) {
    super(props);
  }

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
              <Input placeholder="输入链接跳转的地址" />
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
          style={{marginLeft: '10px'}}
          onClick={onHandleCancel}
        >
          取消
        </Button>
      </Form>
    )
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
    }
  }
})(LinkInput);


export default class LinkComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: {
        url: '',
        title: '',
        target: props.config.link.options.link.target
      },
      visible: false
    };
  }

  onHandleConfirm = (err, changeFields) => {
    const { onHandleChange } = this.props;
    if (err) return false;
    this.setState({
      link: {
        ...this.state.link,
        ...changeFields
      },
      visible: false
    });
    onHandleChange('link', changeFields);
  }

  onHandleCancel = () => {
    this.setState({
      visible: false
    })
  }

  onHandleVisibleChange = (visible) => {
    this.setState({
      visible
    });
  }

  render() {
    const { link, visible } = this.state;
    const { config } = this.props;
    const options = config.link.options;

    const content = (
      <div style={{width: '300px'}}>
        <WrapperLinkInput
          {...link}
          onHandleConfirm={this.onHandleConfirm}
          onHandleCancel={this.onHandleCancel}
        />
      </div>
    );

    return (
        <Button.Group>

          <Popover
            content={content}
            trigger="click"
            visible={visible}
            placement="bottom"
            onVisibleChange={this.onHandleVisibleChange}
          >
            <Button 
              size="small" 
              title={options.link.title}
              onClick={() => this.setState(nextState => ({visible: !nextState.visible}))}
            >
              <i
                className={classnames({
                  [`fa fa-${options.link.icon} fa-lg`]: true,
                  'iconFont': true
                })}
              />
            </Button>
          </Popover>
 
          <Button size="small" title={options.unlink.title}>
            <i
              className={classnames({
                [`fa fa-${options.unlink.icon} fa-lg`]: true,
                'iconFont': true
              })}
            />
          </Button>

        </Button.Group>
    )
  }
}
