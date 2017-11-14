import React from 'react';
import { is } from 'immutable';
import { Tag, Button } from 'antd';
import styles from './index.less';

const { CheckableTag } = Tag;
export default class ToothPosition extends React.Component {
  static defaultProps = {
    upperTooth: [
      { type: 'A', items: [8, 7, 6, 5, 4, 3, 2, 1] },
      { type: 'B', items: [1, 2, 3, 4, 5, 6, 7, 8] },
      { type: 'C', items: ['E', 'D', 'C', 'B', 'A'] },
      { type: 'D', items: ['A', 'B', 'C', 'D', 'E'] }
    ],
    underTooth: [
      { type: 'A', items: ['E', 'D', 'C', 'B', 'A'] },
      { type: 'B', items: ['A', 'B', 'C', 'D', 'E'] },
      { type: 'C', items: [8, 7, 6, 5, 4, 3, 2, 1] },
      { type: 'D', items: [1, 2, 3, 4, 5, 6, 7, 8] }
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedUpperTooth: {
        A: [],
        B: [],
        C: [],
        D: []
      },
      selectedUnderTooth: {
        A: [],
        B: [],
        C: [],
        D: []
      }
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const thisState = this.state || {};
    const thisProps = this.props || {};

    if (
      Object.keys(thisProps).length !== Object.keys(nextProps) ||
      Object.keys(thisState).length !== Object.keys(nextState)
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

  onHandleUpperChange = (type, tag, checked) => {
    const { selectedUpperTooth } = this.state;
    const { onUpperToothChange } = this.props;
    const currentArr = selectedUpperTooth[type];

    const newArr = checked ?
      [...currentArr, tag] :
      currentArr.filter(item => item !== tag);
    selectedUpperTooth[type] = newArr;
    this.setState({
      selectedUpperTooth
    });

    setTimeout(() => {
      onUpperToothChange(this.state.selectedUpperTooth);
    }, 0);
  }

  onHandleUpperFilter = (type, tag) => {
    const { selectedUpperTooth } = this.state;
    return selectedUpperTooth[type].indexOf(tag) !== -1;
  }

  onHandleUnderChange = (type, tag, checked) => {
    const { selectedUnderTooth } = this.state;
    const { onUnderToothChange } = this.props;
    const currentArr = selectedUnderTooth[type];

    const newArr = checked ?
      [...currentArr, tag] :
      currentArr.filter(item => item !== tag);
    selectedUnderTooth[type] = newArr;
    this.setState({
      selectedUnderTooth
    });
    setTimeout(() => {
      onUnderToothChange(this.state.selectedUnderTooth);
    }, 0);
  }

  onHandleUnderFilter = (type, tag) => {
    const { selectedUnderTooth } = this.state;
    return selectedUnderTooth[type].indexOf(tag) !== -1;
  }

  onAllSelectedClick = () => {
    const { onUpperToothChange, onUnderToothChange } = this.props;
    this.setState({
      selectedUpperTooth: {
        A: [8, 7, 6, 5, 4, 3, 2, 1],
        B: [1, 2, 3, 4, 5, 6, 7, 8],
        C: ['A', 'B', 'C', 'D', 'E'],
        D: ['E', 'D', 'C', 'B', 'A']
      },
      selectedUnderTooth: {
        A: ['E', 'D', 'C', 'B', 'A'],
        B: ['A', 'B', 'C', 'D', 'E'],
        C: [8, 7, 6, 5, 4, 3, 2, 1],
        D: [1, 2, 3, 4, 5, 6, 7, 8]
      }
    });

    setTimeout(() => {
      onUpperToothChange(this.state.selectedUpperTooth);
      onUnderToothChange(this.state.selectedUnderTooth);
    }, 0);
  }

  onAllCancelClick = () => {
    const { onUpperToothChange, onUnderToothChange } = this.props;
    this.setState({
      selectedUpperTooth: {
        A: [],
        B: [],
        C: [],
        D: []
      },
      selectedUnderTooth: {
        A: [],
        B: [],
        C: [],
        D: []
      }
    });
    setTimeout(() => {
      onUpperToothChange(this.state.selectedUpperTooth);
      onUnderToothChange(this.state.selectedUnderTooth);
    }, 0);
  }

  render() {
    const { upperTooth, underTooth } = this.props;

    return (
      <div className={styles.root}>
        <Button.Group>
          <Button
            size="small"
            onClick={this.onAllSelectedClick}
          >
            全选
          </Button>
          <Button
            size="small"
            onClick={this.onAllCancelClick}
          >
            取消选中
          </Button>
        </Button.Group>
        <div className={styles.toothContainer}>
          {
            upperTooth.map((item, index) => (
              <span key={index} className={styles.wrapper}>
                {
                  item.items.map(val => (
                    <CheckableTag
                      key={val}
                      onChange={(checked) => this.onHandleUpperChange(item.type, val, checked)}
                      checked={this.onHandleUpperFilter(item.type, val)}
                    >{val}</CheckableTag>
                  ))
                }
              </span>
            ))
          }
          {
            underTooth.map((item, index) => (
              <span key={index} className={styles.wrapper}>
                {
                  item.items.map(val => (
                    <CheckableTag
                      key={val}
                      onChange={(checked) => this.onHandleUnderChange(item.type, val, checked)}
                      checked={this.onHandleUnderFilter(item.type, val)}
                    >{val}</CheckableTag>
                  ))
                }
              </span>
            ))
          }
        </div>
      </div>
    );
  }
}
