import React from 'react';
import classnames from 'classnames';
import { Button } from 'antd';

export default class ListTypeComponent extends React.Component {
  onHandleClick = () => {
    const { type, onChange } = this.props;
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
    const { title, icon, type, listType } = this.props;
    const disabled = this.isDisable();
    return (
      <Button
        type={type === listType ? 'primary' : ''}
        disabled={disabled}
        size="small"
        title={title}
        onClick={this.onHandleClick}
      >
        <i
          className={classnames({
            [`fa fa-${icon} fa-lg`]: true,
            'iconFont': true
          })}
        />
      </Button>
    );
  }
}
