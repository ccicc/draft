/* eslint-disable */ 

import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const { CheckableTag } = Tag;
export default class CustomTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  onHandleChange = (checked) => {
    this.setState({ checked });
  }

  render() {
    return (
      <CheckableTag
        {...this.props}
        onChange={this.onHandleChange}
        checked={this.state.checked}
      />
    )
  }
}
