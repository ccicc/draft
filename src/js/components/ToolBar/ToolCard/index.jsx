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
  BlockTool,
  SelectBgColor,
  TextAlign,
  List,
  Remove
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
            style={{ padding: '5px 0' }}
          >
            <Col span={3}>
              <FontFamily
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                onFocusClick={onFocusClick}
              />
            </Col>
            <Col span={3}>
              <FontSize
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
            <Col span={3}>
              <BlockTool
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
            <Col span={5}>
              <TextAlign
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
            <Col span={1}>
              <Remove
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
          </Row>
          <Row
            type="flex"
            gutter={5}
            style={{ padding: '5px 0' }}
          >
            <Col span={7}>
              <InlineTool
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
            <Col span={2}>
              <SelectBgColor
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
            <Col span={5}>
              <List
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
