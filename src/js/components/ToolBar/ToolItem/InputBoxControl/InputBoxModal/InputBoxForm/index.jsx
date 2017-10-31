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
  static defaultProps = {
    controlID: 'TextInput',
    entityData: {
      controlID: 'TextInput',
      controlName: '',
      tags: [],
      defaultVal: undefined,
      describeVal: '',
      entityColor: '#333',
      dataType: 'string',
      isRequired: true,
      isReadOnly: false,
      dateFormat: 'YYYY-MM-DD HH:mm',
      selectItems: [],
      selectTodos: {
        items: [],
        selectedValues: [],
        currentValue: ''
      }
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      controlID: this.props.controlID,
      entityData: this.props.entityData
    };
  }

  onHandleConfirm = (err, changeFields) => {
    const { onChange, onHiddenModal } = this.props;
    if (err) return false;
    this.setState({
      entityData: {
        ...changeFields
      }
    });
    onChange(changeFields.controlID, changeFields);
    onHiddenModal();
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
        {...entityData}
        config={config}
        controlID={controlID}
        onHandleConfirm={this.onHandleConfirm}
        onHandleCancel={this.onHandleCancel}
      />
    );
  }
}
