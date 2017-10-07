import React from 'react';
import {
  Button,
  Popover
} from 'antd';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import WrapperClipBoard from './ClipBoard';

export default class CopyComponent extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    clipText: PropTypes.string,
    onPasteText: PropTypes.func.isRequired,
    onCutText: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentText: '',
      isVisible: false
    };
  }

  onHandleCopyClick = () => {
    const { clipText } = this.props;
    const { currentText } = this.state;
    this.setState({
      currentText: clipText || currentText,
      isVisible: !this.state.isVisible
    });
  }

  onHandleCutClick = () => {
    const { clipText, onCutText } = this.props;
    const { currentText } = this.state;
    this.setState({
      currentText: clipText || currentText
    });
    onCutText();
  }

  onHandlePasteText = () => {
    const { currentText } = this.state;
    const { onPasteText } = this.props;

    onPasteText(currentText);
  }

  onHandleVisibleChange = (visible) => {
    this.setState({
      isVisible: visible
    });
  }

  onHandleConfirm = (err, changeFields) => {
    if (err) return false;
    this.setState({
      currentText: changeFields.clipText,
      isVisible: false
    });
  }

  onHandleCancel = () => {
    this.setState({
      isVisible: false
    });
  }

  render() {
    const { config } = this.props;
    const { isVisible, currentText } = this.state;
    const options = config.copy.options;

    const content = (
      <div style={{ width: '350px' }}>
        <WrapperClipBoard
          currentText={currentText}
          onHandleConfirm={this.onHandleConfirm}
          onHandleCancel={this.onHandleCancel}
        />
      </div>
    );

    return (
      <Button.Group>

        <Popover
          title="剪 贴 板"
          content={content}
          placement="bottom"
          trigger="click"
          visible={isVisible}
          onVisibleChange={this.onHandleVisibleChange}
        >
          <Button
            size="small"
            title={options.copy.title}
            onClick={this.onHandleCopyClick}
          >
            <i className={classnames({
              [`fa fa-${options.copy.icon} fa-lg`]: true,
              iconFont: true
            })}
            />
          </Button>
        </Popover>
        <Button
          size="small"
          title={options.cut.title}
          onClick={this.onHandleCutClick}
        >
          <i className={classnames({
            [`fa fa-${options.cut.icon} fa-lg`]: true,
            iconFont: true
          })}
          />
        </Button>
        <Button
          size="small"
          title={options.paste.title}
          disabled={!currentText}
          onClick={this.onHandlePasteText}
        >
          <i className={classnames({
            [`fa fa-${options.paste.icon} fa-lg`]: true,
            iconFont: true
          })}
          />
        </Button>
      </Button.Group>
    );
  }
}
