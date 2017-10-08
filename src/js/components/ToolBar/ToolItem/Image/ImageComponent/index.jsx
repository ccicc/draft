/* eslint-disable */

import React from 'react';
import classnames from 'classnames';
import {
  Button,
  Popover
} from 'antd';

import WrapperUpload from './ImageUpload';

export default class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    }
  }

  onHandleClick = () => {
    this.setState(nextState => ({
      isVisible: !nextState.isVisible
    }))
  }

  onHandleVisibleChange = (visible) => {
    this.setState({
      isVisible: visible
    })
  }

  onHandleConfirm = (err, changeFields) => {
    const { onAddImage } = this.props;
    this.setState({
      isVisible: false
    });

    onAddImage(changeFields);
  }

  onHandleCancel = () => {
    this.setState({
      isVisible: false
    })
  }

  render() {
    const { isVisible } = this.state;

    const content = (
      <div style={{ width: '230px' }}>
        <WrapperUpload
          onHandleConfirm={this.onHandleConfirm}
          onHandleCancel={this.onHandleCancel}
        />
      </div>
    )

    return (
      <Button.Group>
        <Popover
          placement="bottom"
          content={content}
          trigger="click"
          visible={isVisible}
          onVisibleChange={this.onHandleVisibleChange}
        >
          <Button
            size="small"
            onClick={this.onHandleClick}
          >
            <i
              className={classnames({
                "fa fa-image fa-lg": true,
                iconFont: true
              })}
            />
          </Button>
        </Popover>
      </Button.Group>
    )
  }
}
