import React from 'react';
import styles from './index.less';

export default class CustomThrough extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <span
        className={styles.root}
      >{children}</span>
    );
  }
}
