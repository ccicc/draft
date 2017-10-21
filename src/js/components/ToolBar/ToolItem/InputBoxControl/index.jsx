import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from 'antd';
import InputBoxModal from './InputBoxModal';

export default class InputBoxControl extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  onHandleClick = () => {
    this.setState({
      isVisible: true
    });
  }

  onHiddenModal = () => {
    this.setState({
      isVisible: false
    });
  }

  render() {
    const { isVisible } = this.state;
    const { config, editorState, onEditorStateChange } = this.props;
    return (
      <div>
        <Button
          size="small"
          title="添加控件"
          icon="info-circle"
          onClick={this.onHandleClick}
        />
        <InputBoxModal
          config={config}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          isVisible={isVisible}
          onHiddenModal={this.onHiddenModal}
        />
      </div>
    );
  }
}
