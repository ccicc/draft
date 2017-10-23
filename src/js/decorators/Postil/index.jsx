import React from 'react';
import {
  Tooltip
} from 'antd';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class Postil extends React.Component {
  static propTypes = {
    entityKey: PropTypes.string.isRequired,
    children: PropTypes.array,
    contentState: PropTypes.object
  };

  render() {
    const { entityKey, contentState, children } = this.props;
    const { postilText } = contentState.getEntity(entityKey).getData();

    return (
      <Tooltip
        title={postilText}
        placement="top"
      >
        <span className={styles.text}>{children}</span>
      </Tooltip>
    );
  }
}
