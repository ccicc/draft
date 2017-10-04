import React from 'react';
import { Button } from 'antd';

export default class CustomBtn extends React.Component {
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
