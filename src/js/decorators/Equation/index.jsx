import React from 'react';
import katex from 'katex';
import PropTypes from 'prop-types';
import styles from './index.less';

class Equation extends React.Component {
  static propTypes = {
    entityKey: PropTypes.string.isRequired,
    contentState: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.renderEquation();
  }

  renderEquation = () => {
    const { entityKey, contentState } = this.props;
    const { equationData } = contentState.getEntity(entityKey).getData();
    katex.render(
      equationData,
      this.equationContainer
    );
  };

  render() {
    return (
      <span
        ref={element => this.equationContainer = element}
        className={styles.equationWrapper}
      />
    );
  }
}

function findEquationEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (characters) => {
      const entityKey = characters.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'EQUATION'
      );
    },
    callback
  );
}

function equationDecorator() {
  return {
    strategy: findEquationEntities,
    component: Equation
  };
}

export default equationDecorator;
