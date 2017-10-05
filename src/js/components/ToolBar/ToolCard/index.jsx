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
  Remove,
  History,
  Link
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
            gutter={10}
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
            <Col span={2}>
              <SelectBgColor
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
            <Col span={1.5}>
              <Remove
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
            <Col span={2.5}>
              <History
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
            <Col span={2.5}>
              <Link
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
          </Row>
          <Row
            type="flex"
            gutter={10}
            style={{ padding: '5px 0' }}
            justify="start"
          >
            <Col span={7.5}>
              <InlineTool
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
            <Col span={4.5}>
              <TextAlign
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
            <Col span={4.5}>
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
