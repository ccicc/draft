import React from 'react';
import katex from 'katex';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class Equation extends React.Component {
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

