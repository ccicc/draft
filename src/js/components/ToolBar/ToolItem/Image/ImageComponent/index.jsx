import React from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Button,
  Popover
} from 'antd';

import ImageUpload from './ImageUpload';

export default class ImageComponent extends React.Component {
  static propTypes = {
    onAddImage: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const thisState = this.state || {};
    const thisProps = this.props || {};
    if (
      Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length
    ) {
      return true;
    }
    for (const key in nextProps) {
      if (nextProps.hasOwnProperty(key) && !is(thisProps[key], nextProps[key])) {
        return true;
      }
    }
    for (const key in nextState) {
      if (nextState.hasOwnProperty(key) && !is(thisState[key], nextState[key])) {
        return true;
      }
    }
    return false;
  }

  onHandleVisibleChange = (visible) => {
    this.setState({
      isVisible: visible
    });
  }

  onHandleConfirm = (err, changeFields) => {
    const { onAddImage } = this.props;
    if (err) return false;
    console.log(changeFields);
    this.setState({
      isVisible: false
    });

    onAddImage(changeFields);
  }

  onHandleCancel = () => {
    this.setState({
      isVisible: false
    });
  }

  render() {
    const { isVisible } = this.state;

    const content = (
      <div style={{ width: '230px' }}>
        <ImageUpload
          onHandleConfirm={this.onHandleConfirm}
          onHandleCancel={this.onHandleCancel}
        />
      </div>
    );

    return (
      <Popover
        placement="bottom"
        content={content}
        trigger="click"
        visible={isVisible}
        onVisibleChange={this.onHandleVisibleChange}
      >
        <Button
          title="插入图片"
          size="small"
          onClick={() => this.setState(nextState => ({
            isVisible: !nextState.isVisible
          }))}
        >
          <i
            className={classnames({
              'fa fa-image fa-lg': true,
              iconFont: true
            })}
          />
        </Button>
      </Popover>
    );
  }
}
