import React from 'react';
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
