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
        upperTooth: {
          A: [],
          B: [],
          C: [],
          D: []
        },
        underTooth: {
          A: [],
          B: [],
          C: [],
          D: []
        }
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

    setTimeout(() => this.onMenarcheRender(), 0);
  }

  onUpperToothChange = (upperTooth) => {
    const { toothPosition } = this.state;
    toothPosition.upperTooth = upperTooth;
    this.setState({ toothPosition });
    setTimeout(() => this.onToothRender(), 0);
  }

  onUnderToothChange = (underTooth) => {
    const { toothPosition } = this.state;
    toothPosition.underTooth = underTooth;
    this.setState({ toothPosition });
    setTimeout(() => this.onToothRender(), 0);
  }

  onMenarcheRender = () => {
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

  onToothRender = () => {
    const { upperTooth, underTooth } = this.state.toothPosition;

    const upperToothA = upperTooth.A.sort().join(' ') || ' ';
    const upperToothB = upperTooth.B.sort().join(' ') || ' ';
    const upperToothC = upperTooth.C.sort().join(' ') || ' ';
    const upperToothD = upperTooth.D.sort().join(' ') || ' ';

    const underToothA = underTooth.A.sort().join(' ') || ' ';
    const underToothB = underTooth.B.sort().join(' ') || ' ';
    const underToothC = underTooth.C.sort().join(' ') || ' ';
    const underToothD = underTooth.D.sort().join(' ') || ' ';

    const equationData = `
      \\begin{array}{c|c}

      \\small \\sf{${upperToothA}} & \\small \\sf{${upperToothB}}   \\cr
      \\footnotesize \\bf{${upperToothC}} &  \\footnotesize \\bf{${upperToothD}} \\cr
      ----- & ----- \\cr
      \\footnotesize \\bf{${underToothA}} &  \\footnotesize \\bf{${underToothB}} \\cr
      \\small \\sf{${underToothC}} &  \\small \\sf{${underToothD}}

      \\end{array}
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
              onUpperToothChange={this.onUpperToothChange}
              onUnderToothChange={this.onUnderToothChange}
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
