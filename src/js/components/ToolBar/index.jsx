import React from 'react';
import { Tabs, Row, Col } from 'antd';
import ToolCard from './ToolCard';

import styles from './index.less';

const TabPane = Tabs.TabPane;
export default class ToolBar extends React.Component {
  render() {
    const {
      editorState,
      onEditorStateChange,
      onFocusClick,
      config
    } = this.props;

    return (
      <div className={styles.root}>
        <Tabs
          defaultActiveKey="1"
        >
          <TabPane tab="编辑" key="1">
            <Row>
              <Col span={24}>
                <ToolCard
                  config={config}
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                  onFocusClick={onFocusClick}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="插入" key="2">插入面板</TabPane>
          <TabPane tab="表格" key="3">表格面板</TabPane>
        </Tabs>
      </div>
    );
  }
}
