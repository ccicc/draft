/* eslint-disable */ 

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Button,
  Popover
} from 'antd';

import EquationInput from './EquationInput';

export default class EquationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    }
  }

  onHandleClick = () => {
    const { isVisible } = this.state;
    this.setState({
      isVisible: !isVisible
    })
  }

  onHandleVisibleChange = (visible) => {
    this.setState({
      isVisible: visible
    })
  }

  onHandleConfirm = () => {
    this.setState({
      isVisible: false
    });
  }

  onHandleCancel = () => {
    this.setState({
      isVisible: false
    });
  }

  render() {
    const { isVisible } = this.state;

    const content = (
      <div style={{ width: '250px' }}>
        <EquationInput 
          onHandleConfirm={this.onHandleConfirm}
          onHandleCancel={this.onHandleCancel}
        />
      </div>
    );

    return (
      <Popover
        title="插入公式"
        placement="bottom"
        content={content}
        visible={isVisible}
        trigger="click"
        onVisibleChange={this.onHandleVisibleChange}
      >
        <Button
          title="插入公式"
          size="small"
          onClick={this.onHandleClick}
        >
          <i className={classnames({
            'fa fa-etsy fa-lg':true,
            iconFont:true
          })}/>
        </Button>
      </Popover>
    )
  }
}
