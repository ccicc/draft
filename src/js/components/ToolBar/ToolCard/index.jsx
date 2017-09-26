import React from 'react';
import {
    Row,
    Col,
    Card,
} from 'antd';

import { FontFamily, FontSize, Inline } from './../ToolItem';

// import styles from './index.less';

// const Option = Select.Option;
// const CheckableTag = Tag.CheckableTag;

export default class ToolCard extends React.Component {
    render() {
        const {
            editorState,
            onEditorStateChange,
            onFocusClick,
        } = this.props;

        return (
            <div>
                <Card
                    noHovering
                    bodyStyle={{ padding: '5px' }}
                    bordered={false}
                >
                    <Row
                        type="flex"
                        gutter={5}
                        justify="space-around"
                        style={{ padding: '5px 0' }}
                    >
                        <Col span={8}>
                            <FontFamily
                                editorState={editorState}
                                onEditorStateChange={onEditorStateChange}
                                onFocusClick={onFocusClick}
                            />
                        </Col>
                        <Col span={14}>
                            <FontSize
                                editorState={editorState}
                                onEditorStateChange={onEditorStateChange}
                            />
                        </Col>
                    </Row>
                    <Row
                        type="flex"
                        gutter={5}
                        justify="space-around"
                        style={{ padding: '5px 0' }}
                    >
                        <Col span={24}>
                            <Inline
                                editorState={editorState}
                                onEditorStateChange={onEditorStateChange}
                            />
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}
