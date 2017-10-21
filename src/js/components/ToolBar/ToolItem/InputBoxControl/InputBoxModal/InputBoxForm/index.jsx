import React from 'react';
import PropTypes from 'prop-types';
import WrapperInputForm from './InputForm';

export default class InputBoxForm extends React.Component {
  static propTypes = {
    controlID: PropTypes.string.isRequired,
    entityData: PropTypes.object,
    config: PropTypes.object.isRequired,
    selectionText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onHiddenModal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      controlID: '',
      entityData: {}
    };
  }

  componentWillMount() {
    const { controlID, entityData } = this.props;
    this.setState({
      controlID,
      entityData
    });
  }

  onHandleConfirm = (err, changeFields) => {
    const { onChange, onHiddenModal } = this.props;
    if (err) return false;
    this.setState({
      entityData: {
        ...changeFields
      }
    });
    setTimeout(() => {
      onChange(this.state.controlID, this.state.entityData);
      onHiddenModal();
    });
  }

  onHandleCancel = () => {
    const { onHiddenModal } = this.props;
    onHiddenModal();
  }

  render() {
    const { controlID, entityData } = this.state;
    const { config } = this.props;
    return (
      <WrapperInputForm
        config={config}
        controlID={controlID}
        {...entityData}
        onHandleConfirm={this.onHandleConfirm}
        onHandleCancel={this.onHandleCancel}
      />
    );
  }
}
