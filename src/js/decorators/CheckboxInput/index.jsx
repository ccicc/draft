import React from 'react';
import { is, Map, List } from 'immutable';
import PropTypes from 'prop-types';
import logicalControlHOC from './../LogicalControlHOC';
import styles from './index.less';

class CheckboxInput extends React.Component {
  static propTypes = {
    entityKey: PropTypes.string,
    children: PropTypes.array,
    contentState: PropTypes.object,
    onLogicalControl: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedValues: [],
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
      selectedValues: selectTodos.selectedValues,
      controlShow: controlShow !== 'hidden'
    });
  }

  componentDidMount() {
    this.props.onLogicalControl(this.state.selectedValues.join(','));
  }

  componentWillReceiveProps(nextProps) {
    const { entityKey, contentState } = nextProps;
    const {
      selectTodos,
      controlShow
    } = contentState.getEntity(entityKey).getData();
    this.setState({
      selectedValues: selectTodos.selectedValues,
      controlShow: controlShow !== 'hidden'
    });
    this.props.onLogicalControl(selectTodos.selectedValues.join(','));
  }

  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};
    const thisState = this.state || {};
    if (
      Object.keys(nextProps).length !== Object.keys(thisProps).length ||
      Object.keys(nextState).length !== Object.keys(thisState).length
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
    const { checked, value } = e.target;
    const { entityKey, contentState } = this.props;
    const entityData = contentState.getEntity(entityKey).getData();
    let selectedValues = entityData.selectTodos.selectedValues;
    if (checked && selectedValues.indexOf(value) === -1) {
      selectedValues = List(selectedValues).push(value).toJS();
    } else {
      selectedValues = List(selectedValues).filter(item => item !== value).toJS();
    }
    const newEntityData = Map(entityData)
      .update('selectTodos', (val) => Map(val).set('selectedValues', selectedValues).toJS())
      .toJS();
    contentState.replaceEntityData(
      entityKey,
      newEntityData
    );
    this.setState({
      selectedValues
    }, () => this.props.onLogicalControl(selectedValues.join(',')));
  }

  render() {
    const { selectedValues, controlShow } = this.state;
    const { entityKey, contentState, children } = this.props;
    const {
      describeVal,
      entityColor,
      selectTodos
    } = contentState.getEntity(entityKey).getData();
    const { items } = selectTodos;
    const checkBoxInput = controlShow &&
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
                      type="checkbox"
                      value={item.value}
                      checked={selectedValues.indexOf(item.value) !== -1}
                      onChange={this.onHandleChange}
                    />
                    {item.value},
                  </label>
                </span>
              ))
            }
            <span className={styles.rim}> ] </span>
            <span style={{ display: 'none' }}>{children}</span>
          </span>
        </span>
      );
    return checkBoxInput;
  }
}

export default logicalControlHOC(CheckboxInput);
