import React from 'react';
import {
  Tabs
} from 'antd';

import WrapperCustomEquation from './CustomEquation';
import ExistingEquation from './ExistingEquation';

const TabPane = Tabs.TabPane;
export default class EquationInput extends React.Component {
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
