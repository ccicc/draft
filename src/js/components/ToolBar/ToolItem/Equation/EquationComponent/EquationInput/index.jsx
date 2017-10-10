/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs
} from 'antd';

import CustomEquation from './CustomEquation';

const TabPane = Tabs.TabPane;
export default class EquationInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onHandleConfirm, onHandleCancel } = this.props;
    return(
      <Tabs>
        <TabPane tab="已有公式" key="1">
          hello,world
        </TabPane>
        <TabPane tab="自定义公式" key="2">
          <CustomEquation 
            onHandleConfirm={onHandleConfirm}
            onHandleCancel={onHandleCancel}
          />
        </TabPane>
      </Tabs>
    )
  }
}
