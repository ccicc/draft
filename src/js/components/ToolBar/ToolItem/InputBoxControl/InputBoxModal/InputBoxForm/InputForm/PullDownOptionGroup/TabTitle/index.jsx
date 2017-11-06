import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class TabTitle extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditor: false,
      title: this.props.title
    };
  }

  onHandleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  onHandleDoubleClick = () => {
    this.setState({
      isEditor: true
    });
  }

  onHandleBlur = (e) => {
    this.setState({
      isEditor: false,
      title: e.target.value
    });
  }

  render() {
    const { isEditor, title } = this.state;
    const tabTitle = isEditor ?
      (<input
        autoFocus  // eslint-disable-line
        autoComplete="off"
        className={styles.input}
        value={title}
        onChange={this.onHandleChange}
        onBlur={this.onHandleBlur}
      />)
      :
      (<span
        onDoubleClick={this.onHandleDoubleClick}
      >
        {title}
      </span>);

    return tabTitle;
  }
}
