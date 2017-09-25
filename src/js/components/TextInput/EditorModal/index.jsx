import React from 'react';
import {
    Modal,
    Button,
    Form,
    Input,
    Select,
    Row,
    Col
} from 'antd';
import SelectType from './SelectType';
import SelectColor from './SelectColor';

const FormItem = Form.Item;

class EditorModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rules: []
        };
    }

    getRules = (rules) => {
        this.setState({
            rules
        });
    }

    render() {
        const {
            form,
            isEditor,
            isLoading,
            onConfirm,
            onCancel,
            onSelectDataType,
            onSelectFontColor
        } = this.props;
        const { getFieldDecorator, validateFields } = form;
        return (
            <div>
                <Modal
                    title="文本输入框"
                    visible={isEditor}
                    onCancel={onCancel}
                    footer={[
                        <Button
                            key="submit"
                            size="large"
                            type="primary"
                            loading={isLoading}
                            onClick={() => validateFields({ force: true }, onConfirm)}
                        >
                            确定
                        </Button>,
                        <Button
                            key="cancel"
                            size="large"
                            onClick={onCancel}
                        >
                            取消
                        </Button>
                    ]}
                >
                    <Form layout="vertical">
                        <Row gutter={15}>
                            <Col span={12}>
                                <FormItem label="控件ID">
                                    { getFieldDecorator('controlID')(<Input disabled />) }
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="控件名称">
                                    { getFieldDecorator('controlName', {
                                        rules: [{ required: true, message: '必须填写控件名' }]
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={15}>
                            <Col span={12}>
                                <FormItem label="标签">
                                    { getFieldDecorator('tag', {
                                        valuePropName: 'defaultValue'
                                    })(
                                        <Select
                                            allowClear
                                            mode="tags"
                                            tokenSeparators={[',']}
                                            placeholder="多个标签可用逗号分隔"
                                        />
                                    ) }
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="控件描述">
                                    { getFieldDecorator('describeVal')(<Input />) }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={15}>
                            <Col span={12}>
                                <FormItem label="数据类型">
                                    { getFieldDecorator('dataType', {
                                        valuePropName: 'dataType'
                                    })(
                                        <SelectType
                                            getRules={this.getRules}
                                            onSelectType={onSelectDataType}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="控件值">
                                    { getFieldDecorator('defaultVal', {
                                        rules: this.state.rules
                                    })(<Input />) }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    label="字体颜色"
                                >
                                    {
                                        getFieldDecorator('fontColor', {
                                            valuePropName: 'fontColor'
                                        })(<SelectColor onSelectFontColor={onSelectFontColor} />)
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        );
    }
}


export default Form.create({
    mapPropsToFields(props) {
        return {
            controlID: {
                value: props.controlID
            },
            controlName: {
                value: props.controlName
            },
            defaultVal: {
                value: props.defaultVal
            },
            describeVal: {
                value: props.describeVal
            },
            tag: {
                value: props.tag.map(item => item.toString())
            },
            dataType: {
                value: props.dataType
            },
            fontColor: {
                value: props.fontColor
            }
        };
    }
})(EditorModal);
