/*
  global
  window: false
*/ 

import React from 'react';
import styles from './index.less';

class Link extends React.Component {
  openLink = () => {
    const { entityKey, contentState } = this.props;
    const { url } = contentState.getEntity(entityKey).getData();
    const linkTab = window.open(url, 'blank');
    linkTab.focus();
  }
  render() {
    const { entityKey, contentState, children } = this.props;
    const { url, target } = contentState.getEntity(entityKey).getData();
    return (
      <a
        className={styles.link}
        href={url}
        target={target}
      >
        {children}
      </a>
    );
  }
}

function findLinkEntities(contentBlock, callback, contentState) {
  console.log(JSON.stringify(contentBlock));
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback,
  );
}

function linkDecorator() {
  return {
    strategy: findLinkEntities,
    component: Link
  };
}

export default linkDecorator;
