/* eslint-disable */

import React from 'react';
import katex from 'katex';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Form,
  Row,
  Col,
  Collapse,
  Input,
  Button
} from 'antd';
import 'moment/locale/zh-cn';
import WrapperMenstrual from './Menstrual';
import styles from './index.less';

moment.locale('zh-cn');

const Panel = Collapse.Panel;
export default class ExistingEquation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menstrualData: {
        menarcheAge: '',
        menstrualPeriod: '',
        menstrualCycle: '',
        lastMenstrual: ''
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

  onEquationDataChange = () => {
    const { 
      menarcheAge, 
      menstrualPeriod, 
      menstrualCycle, 
      lastMenstrual,
    } = this.state.menstrualData;

    const equationData =`
      ${menarcheAge.value || ''}
      \\dfrac{${menstrualPeriod.value || ''}}{${menstrualCycle.value || ''}}
      ${moment(lastMenstrual.value).format('YYYY-MM-DD') || ''}
    `;
    katex.render(
      equationData,
      this.equationContainer
    );
  }

  render() {
    const { onHandleConfirm, onHandleCancel } = this.props;
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
        </Collapse>
        <div
          ref={element => this.equationContainer = element}
          className={styles.equationPreview} 
        ></div>
        <Button type="primary">确定</Button>
        <Button style={{ marginLeft: '10px' }}>取消</Button>
      </div>
    )
  }
}
