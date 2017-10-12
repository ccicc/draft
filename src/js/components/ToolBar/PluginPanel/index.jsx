/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card
} from 'antd';
import {
  TextInput
} from './../PluginItem';


export default class PluginPanel extends React.Component{
  static propTypes = {
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired
  };

  render() {
    const { config, editorState, onEditorStateChange } = this.props;
    return (
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
          <Col span={24}>
            <TextInput 
              config={config}
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
            />
          </Col>
        </Row>
      </Card>
    )
  }
}
