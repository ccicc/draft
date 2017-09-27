import React from 'react';
import {
  Row,
  Col,
  Card,
} from 'antd';

import {
  FontFamily,
  FontSize,
  InlineTool,
  SelectBgColor
} from './../ToolItem';

export default class ToolCard extends React.Component {
  render() {
    const {
      config,
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
            justify="space-between"
            style={{ padding: '5px 0' }}
          >
            <Col span={8}>
              <FontFamily
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                onFocusClick={onFocusClick}
              />
            </Col>
            <Col span={8}>
              <FontSize
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
            <Col span={8}>
              <SelectBgColor
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
          </Row>
          <Row
            type="flex"
            gutter={5}
            justify="space-between"
            style={{ padding: '5px 0' }}
          >
            <Col span={24}>
              <InlineTool
                config={config}
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
