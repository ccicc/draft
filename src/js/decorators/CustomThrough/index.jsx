import React from 'react';
import styles from './index.less';

class CustomThrough extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <span
        className={styles.root}
      >{children}</span>
    );
  }
}

function findCustomThroughEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'CUSTOMTHROUGH'
      );
    },
    callback
  );
}

function strikeThroughDecorator() {
  return {
    strategy: findCustomThroughEntities,
    component: CustomThrough
  };
}

export default strikeThroughDecorator;
