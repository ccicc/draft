/* eslint-disable */

import React from 'react';
import {
  Popover,
  Button
} from 'antd';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  onHandleEnter = () => this.setState({isVisible: true})
  onHandleLeave = () => this.setState({isVisible: false})

  render() {
    const { isVisible } = this.state;
    const { block, contentState } = this.props;
    const entity = contentState.getEntity(block.getEntityAt(0));
    const {imageUrl, imageAlt, imageWidth, imageHeight} = entity.getData();

    const content = (
      <Button.Group>
        <Button></Button>
      </Button.Group>
    );

    return (
      <Popover
        content="hello,world"
        placement="top"
        trigger="hover"
        visible={isVisible}
      >
        <span 
          className={classnames({
            [styles.imageWrapper]: isVisible
          })}
          onMouseEnter={this.onHandleEnter}
          onMouseLeave={this.onHandleLeave}
        >
          <img
            src={imageUrl}
            alt={imageAlt}
            style={{
              width: imageWidth,
              height: imageHeight
            }}
          />
        </span>
      </Popover>
    )
  }
}
