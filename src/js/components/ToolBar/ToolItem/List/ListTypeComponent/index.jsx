import React from 'react';
import { Button } from 'antd';

export default class ListTypeComponent extends React.Component {
  onHandleClick = () => {
    const { type, onChange } = this.props;
    console.log(type);
    onChange(type);
  }

  isDisable = () => {
    const { type, isIndent, isOutdent } = this.props;
    if (
      (isIndent && type === 'indent') ||
      (isOutdent && type === 'outdent')
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { title, icon } = this.props;
    const disabled = this.isDisable();
    return (
      <Button
        disabled={disabled}
        size="small"
        title={title}
        onClick={this.onHandleClick}
      >
        <i className={`fa fa-${icon} fa-lg`} />
      </Button>
    );
  }
}
