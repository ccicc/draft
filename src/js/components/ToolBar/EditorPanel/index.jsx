import React from 'react';
import PropTypes from 'prop-types';
import {
  Row
} from 'antd';
import * as ToolComponent from './../ToolItem';
import showItemHOC from './showItemHOC';
import styles from './index.less';

export default class EditorPanel extends React.Component {
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
    const options = config.options;

    return (
      <Row
        type="flex"
        gutter={10}
        className={styles.root}
        style={{ padding: '5px 0' }}
      >
        {
          options.map((item, index) => {
            const Component = ToolComponent[item.name];
            const WrapperComponent = showItemHOC(item)(Component);
            return (
              <WrapperComponent
                key={index}
                isShow={item.isShow}
                config={config}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            );
          })
        }
      </Row>
    );
  }
}
