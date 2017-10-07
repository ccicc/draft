/*
  global
  window: false
*/

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './index.less';

class Link extends React.Component {
  static propTypes = {
    entityKey: PropTypes.string.isRequired,
    children: PropTypes.array,
    contentState: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowIcon: false
    };
  }

  onMouseEnter = () => {
    this.setState({
      isShowIcon: true
    });
  }

  onMouseLeave = () => {
    this.setState({
      isShowIcon: false
    });
  }

  openLink = () => {
    const { entityKey, contentState } = this.props;
    const { url, target } = contentState.getEntity(entityKey).getData();
    let linkTab;
    if (target === '_self') {
      window.location.assign(url);
    } else if (target === '_blank') {
      linkTab = window.open(url, 'blank');
    }
    linkTab && linkTab.focus();
  }

  render() {
    const { isShowIcon } = this.state;
    const { entityKey, contentState, children } = this.props;
    const { url, target } = contentState.getEntity(entityKey).getData();
    return (
      <span
        className={styles.root}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <a
          href={url}
          target={target}
          className={styles.link}
        >
          {children}
        </a>
        {
          isShowIcon &&
          <i
            title={url}
            onClick={this.openLink}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            className={classnames({
              'fa fa-external-link fa-lg': true,
              [`${styles.icon}`]: true
            })}
          />
        }
      </span>
    );
  }
}

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

function linkDecorator() {
  return {
    strategy: findLinkEntities,
    component: Link
  };
}

export default linkDecorator;
