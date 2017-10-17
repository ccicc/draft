import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Button,
  Modal
} from 'antd';

import EquationInput from './EquationInput';

export default class EquationComponent extends React.Component {
  static propTypes = {
    onAddEquation: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      equationData: ''
    };
  }

  onHandleClick = () => {
    const { isVisible } = this.state;
    this.setState({
      isVisible: !isVisible
    });
  }

  onExistingEquationConfirm = (equationData) => {
    const { onAddEquation } = this.props;
    this.setState({
      isVisible: false,
      equationData
    });

    setTimeout(() => onAddEquation(this.state.equationData), 0);
  }

  onCustomEquationConfirm = (err, changeFields) => {
    const { onAddEquation } = this.props;
    if (err) return false;
    this.setState({
      isVisible: false,
      equationData: changeFields.customEquation
    });

    setTimeout(() => onAddEquation(this.state.equationData), 0);
  }

  onHandleCancel = () => {
    this.setState({
      isVisible: false
    });
  }

  render() {
    const { isVisible } = this.state;

    return (
      <div>
        <Button
          title="插入公式"
          size="small"
          onClick={this.onHandleClick}
        >
          <i className={classnames({
            'fa fa-etsy fa-lg': true,
            iconFont: true
          })}
          />
        </Button>
        <Modal
          visible={isVisible}
          title="插入公式"
          width={420}
          footer={null}
          onCancel={() => this.setState({ isVisible: false })}
        >
          <EquationInput
            onCustomEquationConfirm={this.onCustomEquationConfirm}
            onExistingEquationConfirm={this.onExistingEquationConfirm}
            onHandleCancel={this.onHandleCancel}
          />
        </Modal>
      </div>
    );
  }
}
