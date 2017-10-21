/* eslint-disable */ 

import React from 'react';
import eventProxy from './../../../../../../customUtils/eventProxy';
import WrapperInputForm from './InputForm';
export default class InputBoxForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controlID: '',
      entityData: {}
    }
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
    if(err) return false;
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
    return (
      <WrapperInputForm
        controlID={controlID}
        {...entityData}
        onHandleConfirm={this.onHandleConfirm}
        onHandleCancel={this.onHandleCancel}
      />
    )
  }
}
