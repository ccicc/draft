import React from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
  Button,
} from 'antd';
import classnames from 'classnames';

import WrapperLinkInput from './LinkInput';

export default class LinkComponent extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    onHandleChange: PropTypes.func.isRequired,
    currentState: PropTypes.shape({
      link: PropTypes.object,
      selectionText: PropTypes.string
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      link: {
        url: '',
        title: '',
        target: props.config.link.options.link.target
      },
      visible: false
    };
  }

  onHandleConfirm = (err, changeFields) => {
    // 表单校验完成后获取字段并创建链接
    if (err) return false;
    this.setState({
      link: {
        ...this.state.link,
        ...changeFields
      },
      visible: false
    });
    setTimeout(() => this.onAddLink(this.state.link), 0);
  }

  onHandleCancel = () => {
    this.setState({
      visible: false
    });
  }

  onHandleVisibleChange = (visible) => {
    this.setState({
      visible
    });
  }

  onSelectionLink = () => {
    // 在编辑器中选取字段后将其映射到链接创建表单上
    const { currentState } = this.props;
    const { visible, link } = this.state;

    this.setState({
      link: {
        url: currentState.link && currentState.link.url,
        title: (currentState.link && currentState.link.title) || currentState.selectionText,
        target: (currentState.link && currentState.link.target) || link.target
      },
      visible: !visible
    });
  }

  onAddLink = (link) => {
    const { onHandleChange } = this.props;
    onHandleChange('link', link);
  }

  onRemoveLink = () => {
    const { onHandleChange } = this.props;
    onHandleChange('unlink');
  }

  render() {
    const { link, visible } = this.state;
    const { config, currentState } = this.props;
    const options = config.link.options;

    const content = (
      <div style={{ width: '300px' }}>
        <WrapperLinkInput
          {...link}
          onHandleConfirm={this.onHandleConfirm}
          onHandleCancel={this.onHandleCancel}
        />
      </div>
    );

    return (
      <Button.Group>

        <Popover
          content={content}
          trigger="click"
          visible={visible}
          placement="bottom"
          onVisibleChange={this.onHandleVisibleChange}
        >
          <Button
            size="small"
            title={options.link.title}
            onClick={this.onSelectionLink}
          >
            <i
              className={classnames({
                [`fa fa-${options.link.icon} fa-lg`]: true,
                'iconFont': true
              })}
            />
          </Button>
        </Popover>

        <Button
          size="small"
          title={options.unlink.title}
          disabled={!currentState.link}
          onClick={this.onRemoveLink}
        >
          <i
            className={classnames({
              [`fa fa-${options.unlink.icon} fa-lg`]: true,
              'iconFont': true
            })}
          />
        </Button>

      </Button.Group>
    );
  }
}
