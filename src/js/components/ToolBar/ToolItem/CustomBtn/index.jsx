import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

export default class CustomBtn extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    currentStyles: PropTypes.object.isRequired,
    onToggleStyle: PropTypes.func.isRequired,
  };

  onHandleClick = () => {
    const { currentStyles, onToggleStyle, type } = this.props;
    currentStyles[type] = !currentStyles[type];
    onToggleStyle(type);
  }

  render() {
    const { title, type, currentStyles } = this.props;
    return (
      <Button
        type={currentStyles[type] ? 'primary' : ''}
        title={title}
        size="small"
        onClick={this.onHandleClick}
      >
        {this.props.children}
      </Button>
    );
  }
}
