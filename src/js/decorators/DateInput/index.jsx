import React from 'react';
import {
  DatePicker
} from 'antd';
import moment from 'moment';
import { PopupBox } from './../../components/Common';
import styles from './index.less';

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  onHandleOpenClick = () => {
    this.setState({
      isOpen: true
    });
  }
  onHandleOkClick = () => {
    this.setState({
      isOpen: false
    });
  }

  onHandleChange = (date) => {
    const { entityKey, contentState } = this.props;
    const data = contentState.getEntity(entityKey).getData();
    contentState.replaceEntityData(
      entityKey,
      {
        ...data,
        defaultVal: date
      }
    );
  }

  render() {
    const { entityKey, contentState, children } = this.props;
    const { isOpen } = this.state;
    const {
      controlID,
      controlName,
      defaultVal,
      describeVal,
      dateFormat,
      entityColor
    } = contentState.getEntity(entityKey).getData();

    return (
      <span className={styles.root}>
        <PopupBox
          editorCommand="dateInputEditor"
          deleteCommand="dateInputDelete"
          controlID={controlID}
          controlName={controlName}
        >
          {controlName && <span className={styles.controlName}>{controlName} : </span>}
        </PopupBox>
        <span
          className={styles.controlVal}
          onClick={this.onHandleOpenClick}
          title={describeVal}
        >
          <i className={styles.rim}> [ </i>
          <span style={{ color: `${entityColor}` }}>
            {moment(defaultVal).format(dateFormat) || ''}
          </span>
          <i className={styles.rim}> ] </i>
          <DatePicker
            showTime
            className={styles.datePicker}
            size="default"
            defaultValue={defaultVal}
            format={dateFormat}
            open={isOpen}
            onOk={this.onHandleOkClick}
            onChange={this.onHandleChange}
          />
          <span style={{ display: 'none' }}>{children}</span>
        </span>
      </span>
    );
  }
}
