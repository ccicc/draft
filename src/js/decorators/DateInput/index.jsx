import React from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker } from 'antd';
import logicalControlHOC from './../LogicalControlHOC';

import styles from './index.less';

class DateInput extends React.Component {
  static propTypes = {
    entityKey: PropTypes.string,
    contentState: PropTypes.object,
    children: PropTypes.array,
    onLogicalControl: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isOpen: false,
      controlShow: true
    };
  }

  componentWillMount() {
    const { entityKey, contentState } = this.props;
    const {
      defaultVal, // momentType
      controlShow
    } = contentState.getEntity(entityKey).getData();
    this.setState({
      value: defaultVal,
      controlShow: controlShow !== 'hidden'
    });
  }

  componentDidMount() {
    this.props.onLogicalControl();
  }

  componentWillReceiveProps(nextProps) {
    const { entityKey, contentState } = nextProps;
    const {
      defaultVal,
      controlShow
    } = contentState.getEntity(entityKey).getData();
    this.setState({
      value: defaultVal,
      controlShow: controlShow !== 'hidden'
    });
    this.props.onLogicalControl();
  }

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

  onHandleOpenClick = () => {
    this.setState({
      isOpen: true
    });
  }

  onHandleOkClick = () => {
    this.setState({
      isOpen: false
    });
    this.props.onLogicalControl();
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
    this.props.onLogicalControl();
  }

  render() {
    const { entityKey, contentState, children } = this.props;
    const { isOpen, controlShow } = this.state;
    const {
      defaultVal,
      describeVal,
      dateFormat,
      entityColor
    } = contentState.getEntity(entityKey).getData();

    const DateInputComponent = controlShow && (
      <span className={styles.root}>
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

    return DateInputComponent;
  }
}

export default logicalControlHOC(DateInput);
