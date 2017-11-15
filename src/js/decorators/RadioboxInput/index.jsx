import React from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import logicalControlHOC from './../LogicalControlHOC';
import styles from './index.less';

class RadioboxInput extends React.Component {
  static propTypes = {
    entityKey: PropTypes.string,
    contentState: PropTypes.object,
    onLogicalControl: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      controlShow: true
    };
  }

  componentWillMount() {
    const { entityKey, contentState } = this.props;
    const {
      selectTodos,
      controlShow
    } = contentState.getEntity(entityKey).getData();
    this.setState({
      value: selectTodos.currentValue,
      controlShow: controlShow !== 'hidden'
    });
  }

  componentDidMount() {
    this.props.onLogicalControl(this.state.value);
  }

  componentWillReceiveProps(nextProps) {
    const { entityKey, contentState } = nextProps;
    const {
      selectTodos,
      controlShow
    } = contentState.getEntity(entityKey).getData();
    this.setState({
      value: selectTodos.currentValue,
      controlShow: controlShow !== 'hidden'
    });
    this.props.onLogicalControl(selectTodos.currentValue);
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

  onHandleChange = (e) => {
    const { value } = e.target;
    const { entityKey, contentState } = this.props;
    const entityData = contentState.getEntity(entityKey).getData();
    let { currentValue } = entityData.selectTodos;
    currentValue = value;
    contentState.replaceEntityData(
      entityKey,
      {
        ...entityData,
        selectTodos: {
          ...entityData.selectTodos,
          currentValue
        }
      }
    );
    this.setState({
      value: currentValue
    });
    this.props.onLogicalControl(currentValue);
  };

  render() {
    const { value, controlShow } = this.state;
    const { entityKey, contentState, children } = this.props;
    const {
      describeVal,
      entityColor,
      selectTodos
    } = contentState.getEntity(entityKey).getData();
    const { items } = selectTodos;
    const radioInputContent = controlShow &&
      (
        <span className={styles.root}>
          <span
            className={styles.controlVal}
            title={describeVal}
          >
            <span className={styles.rim}> [ </span>
            {
              items.map((item, index) => (
                <span
                  key={index}
                  className={styles.item}
                  style={{ color: entityColor }}
                >
                  <label className={styles.itemLabel}>
                    <input
                      className={styles.input}
                      type="radio"
                      value={item.value}
                      checked={item.value === value}
                      onChange={this.onHandleChange}
                    />
                    {item.value}、
                  </label>
                </span>
              ))
            }
            <span className={styles.rim}> ] </span>
            <span style={{ display: 'none' }}>{children}</span>
          </span>
        </span>
      );
    return radioInputContent;
  }
}

export default logicalControlHOC(RadioboxInput);
