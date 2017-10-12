import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Row, Col } from 'antd';
import EditorPanel from './EditorPanel';
import PluginPanel from './PluginPanel';

import styles from './index.less';

const TabPane = Tabs.TabPane;
export default class ToolBar extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired
  };

  render() {
    const {
      editorState,
      onEditorStateChange,
      config,
    } = this.props;

    return (
      <div className={styles.root}>
        <Tabs
          defaultActiveKey="1"
        >
          <TabPane tab="编辑" key="1">
            <Row>
              <Col span={24}>
                <EditorPanel
                  config={config}
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                />
              </Col>
            </Row>
          </TabPane>

          <TabPane tab="插入" key="2">
            <Row span={24}>
              <Col>
                <PluginPanel
                  config={config}
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                />
              </Col>
            </Row>
          </TabPane>

          <TabPane tab="表格" key="3">表格面板</TabPane>
        </Tabs>
      </div>
    );
  }
}
