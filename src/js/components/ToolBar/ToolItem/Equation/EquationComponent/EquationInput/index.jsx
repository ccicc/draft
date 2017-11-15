import React from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import {
  Tabs
} from 'antd';

import WrapperCustomEquation from './CustomEquation';
import ExistingEquation from './ExistingEquation';

const TabPane = Tabs.TabPane;
export default class EquationInput extends React.Component {
  static propTypes = {
    onCustomEquationConfirm: PropTypes.func.isRequired,
    onExistingEquationConfirm: PropTypes.func.isRequired,
    onHandleCancel: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};
    const thisState = this.state || {};
    if (
      Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length
    ) {
      return true;
    }
    for (const key in nextProps) {
      if (nextProps.hasOwnProperty(key) && !is(thisProps[key], nextProps[key])) {
        return true;
      }
    }
    for (const key in nextState) {
      if (nextState.hasOwnProperty(key) && !is(thisState[key], nextState[key])) {
        return true;
      }
    }
    return false;
  }

  render() {
    const { onCustomEquationConfirm, onExistingEquationConfirm, onHandleCancel } = this.props;
    return (
      <Tabs>
        <TabPane tab="已有公式" key="1">
          <ExistingEquation
            onHandleCancel={onHandleCancel}
            onExistingEquationConfirm={onExistingEquationConfirm}
          />
        </TabPane>
        <TabPane tab="自定义公式" key="2">
          <WrapperCustomEquation
            onCustomEquationConfirm={onCustomEquationConfirm}
            onHandleCancel={onHandleCancel}
          />
        </TabPane>
      </Tabs>
    );
  }
}
