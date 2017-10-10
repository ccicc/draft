import React from 'react';
import PropTypes from 'prop-types';
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
  Link,
  Copy,
  Image,
  Postil,
  Equation
} from './../ToolItem';

export default class ToolCard extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired
  };

  render() {
    const {
      config,
      editorState,
      onEditorStateChange,
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
            <Col span={3.5}>
              <Copy
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
            <Col span={1.5}>
              <Image
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
            <Col span={1.5}>
              <Postil
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                config={config}
              />
            </Col>
            <Col span={1.5}>
              <Equation
                editorState={editorState}
                config={config}
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}
