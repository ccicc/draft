import React from 'react';
import { Button } from 'antd';

export default class CustomBtn extends React.Component {
  onHandleClick = () => {
    const { currentStyles, onToggleStyle, type } = this.props;
    currentStyles[type] = !currentStyles[type];
    onToggleStyle(type);
  }

  render() {
    const { title } = this.props;
    return (
      <Button
        title={title}
        size="small"
        onClick={this.onHandleClick}
      >
        {this.props.children}
      </Button>
    );
  }
}
