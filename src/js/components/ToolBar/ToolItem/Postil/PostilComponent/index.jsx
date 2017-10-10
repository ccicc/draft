import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Button,
  Popover
} from 'antd';
import WrapperPostilInput from './PostilInput';

export default class PostilComponent extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    postil: PropTypes.shape({
      postilText: PropTypes.string,
      entityText: PropTypes.string
    }),
    selectedText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      customPostil: {
        postilText: '',
        entityText: ''
      }
    };
  }

  onAddPostilClick = () => {
    const { isVisible } = this.state;
    const { postil, selectedText } = this.props;
    this.setState({
      isVisible: !isVisible,
      customPostil: {
        postilText: postil && postil.postilText,
        entityText: (postil && postil.entityText) || selectedText
      }
    });
  }

  onRemovePostilClick = () => {
    const { onChange } = this.props;
    const { customPostil } = this.state;
    onChange('unpostil', customPostil);
  }

  onHandleConfirm = (err, changeFields) => {
    const { onChange } = this.props;
    if (err) return false;
    this.setState({
      isVisible: false,
      customPostil: changeFields
    });
    setTimeout(() => onChange('postil', this.state.customPostil), 0);
  }

  onHandleCancel = () => {
    this.setState({
      isVisible: false
    });
  }

  onHandleVisibleChange = (visible) => [
    this.setState({
      isVisible: visible
    })
  ]

  render() {
    const { isVisible, customPostil } = this.state;
    const { config, currentEntity } = this.props;
    const options = config.postil.options;

    const content = (
      <div style={{ width: '250px' }}>
        <WrapperPostilInput
          {...customPostil}
          onHandleConfirm={this.onHandleConfirm}
          onHandleCancel={this.onHandleCancel}
        />
      </div>
    );

    return (
      <Button.Group>
        <Popover
          placement="bottom"
          title="添加批注"
          content={content}
          trigger="click"
          visible={isVisible}
          onVisibleChange={this.onHandleVisibleChange}
        >
          <Button
            size="small"
            title={options.addPostil.title}
            onClick={this.onAddPostilClick}
          >
            <i
              className={classnames({
                [`fa fa-${options.addPostil.icon} fa-lg`]: true,
                iconFont: true
              })}
            />
          </Button>
        </Popover>
        <Button
          size="small"
          disabled={!currentEntity}
          title={options.removePostil.title}
          onClick={this.onRemovePostilClick}
        >
          <i
            className={classnames({
              [`fa fa-${options.removePostil.icon} fa-lg`]: true,
              iconFont: true
            })}
          />
        </Button>
      </Button.Group>
    );
  }
}
