/* eslint-disable */

import React from 'react';
import {
    Row,
    Col,
    Card,
    Select,
    Tag,
    Button,
    Icon
} from 'antd';

import CustomTag from './CustomTag';
import FontFamily from './FontFamily';

import styles from './index.less';

const Option = Select.Option;
const CheckableTag = Tag.CheckableTag;

export default class ToolCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { editorState, onEditorStateChange } = this.props;

        return (
            <div>
                <Card
                    noHovering
                    bodyStyle={{padding: '5px'}}
                    bordered={false}
                >
                    <Row 
                        type="flex"
                        gutter={5}
                        justify="space-around"
                        style={{padding: '5px 0'}}
                    >
                        <Col span={8}>
                            <FontFamily 
                                editorState={editorState}
                                onEditorStateChange={onEditorStateChange}
                            />
                        </Col>
                        <Col span={8}>
                            <Select
                                size="small"
                                defaultValue="14px"
                                style={{width: '100%'}}
                            >
                                <Option value="10px">10px</Option>
                                <Option value="11px">11px</Option>
                                <Option value="12px">12px</Option>
                                <Option value="14px">14px</Option>
                                <Option value="16px">16px</Option>
                                <Option value="18px">18px</Option>
                                <Option value="20px">20px</Option>
                                <Option value="24px">24px</Option>
                                <Option value="36px">36px</Option>
                            </Select>
                        </Col>
                        <Col span={6}>
                            <Button.Group>
                                <Button size="small" title="增大字体">A+</Button>
                                <Button size="small" title="减小字体">A-</Button>
                            </Button.Group>
                        </Col>
                    </Row>
                    <Row
                        type="flex"
                        gutter={5}
                        justify="space-around"
                        style={{padding: '5px 0'}}
                    >
                    <Col span={24}>
                            <CustomTag title="字体加粗">
                                <i className="fa fa-bold fa-lg"></i>
                            </CustomTag>
                            <CustomTag title="斜体">
                                <i className="fa fa-italic fa-lg"></i>
                            </CustomTag>
                            <CustomTag title="下划线">
                                <i className="fa fa-underline fa-lg"></i>
                            </CustomTag>
                            <CustomTag title="删除线">
                                <i className="fa fa-strikethrough fa-lg"></i>
                            </CustomTag>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}