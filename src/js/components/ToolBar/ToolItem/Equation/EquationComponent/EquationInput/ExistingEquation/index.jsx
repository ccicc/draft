import React from 'react';
import PropTypes from 'prop-types';
import katex from 'katex';
import moment from 'moment';
import {
  Collapse,
  Button
} from 'antd';

import WrapperMenstrual from './Menstrual';
import ToothPosition from './ToothPosition';
import styles from './index.less';

const Panel = Collapse.Panel;
export default class ExistingEquation extends React.Component {
  static propTypes = {
    onExistingEquationConfirm: PropTypes.func.isRequired,
    onHandleCancel: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      menstrualData: {
        menarcheAge: '',
        menstrualPeriod: '',
        menstrualCycle: '',
        lastMenstrual: ''
      },
      toothPosition: {
        upperTooth: [],
        underTooth: []
      },
      equationData: ''
    };
  }

  onMenstrualDataChange = (changeFields) => {
    this.setState({
      menstrualData: {
        ...this.state.menstrualData,
        ...changeFields
      }
    });

    setTimeout(() => this.onEquationDataChange(), 0);
  }

  onToothPositionChange = (upperTooth, underTooth) => {
    const { toothPosition } = this.state;
    toothPosition.upperTooth = upperTooth;
    toothPosition.underTooth = underTooth;
    this.setState({
      toothPosition
    });
  }

  onEquationDataChange = () => {
    const {
      menarcheAge,
      menstrualPeriod,
      menstrualCycle,
      lastMenstrual,
    } = this.state.menstrualData;

    const equationData = `
      ${menarcheAge.value || ''}
      \\dfrac{${menstrualPeriod.value || ''}}{${menstrualCycle.value || ''}}
      ${moment(lastMenstrual.value).format('YYYY-MM-DD') || ''}
    `;

    katex.render(
      equationData,
      this.equationContainer
    );
    this.setState({
      equationData
    });
  }

  onHandleConfirm = () => {
    const { onExistingEquationConfirm } = this.props;
    const { equationData } = this.state;

    if (equationData) {
      onExistingEquationConfirm(equationData);
    }
  }

  render() {
    const { onHandleCancel } = this.props;
    const { menstrualData } = this.state;
    return (
      <div>
        <Collapse
          bordered={false}
        >
          <Panel header="月经史公式" key="1">
            <WrapperMenstrual
              {...menstrualData}
              onChange={this.onMenstrualDataChange}
            />
          </Panel>
          <Panel header="牙位公式" key="2">
            <ToothPosition
              onChange={this.onToothPositionChange}
            />
          </Panel>
        </Collapse>
        <div
          ref={element => this.equationContainer = element}
          className={styles.equationPreview}
        />
        <Button
          type="primary"
          onClick={this.onHandleConfirm}
        >
          确定
        </Button>
        <Button
          style={{ marginLeft: '10px' }}
          onClick={onHandleCancel}
        >
          取消
        </Button>
      </div>
    );
  }
}
