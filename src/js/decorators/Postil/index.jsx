/* eslint-disable */

import React from 'react';
import {
  Tooltip
} from 'antd';
import PropTypes from 'prop-types';

import styles from './index.less';

class Postil extends React.Component {
  static propTypes = {
    entityKey: PropTypes.string.isRequired,
    children: PropTypes.array,
    contentState: PropTypes.object
  };

  render() {
    const { entityKey, contentState, children } = this.props;
    const { entityText, postilText } = contentState.getEntity(entityKey).getData();

    return (
      <Tooltip
        title={postilText}
        placement="top"
      >
        <span className={styles.text}>{children}</span>
      </Tooltip>
    )
  }
}

function findPostilEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'POSTIL'
      )
    },
    callback
  );
}

function postilDecorator() {
  return {
    strategy: findPostilEntities,
    component: Postil
  };
}

export default postilDecorator;
