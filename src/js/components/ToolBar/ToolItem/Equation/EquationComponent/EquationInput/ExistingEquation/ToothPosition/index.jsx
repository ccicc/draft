import React from 'react';
import { Tag } from 'antd';
import styles from './index.less';

const { CheckableTag } = Tag;
export default class ToothPosition extends React.Component {
  static defaultProps = {
    upperTooth: {
      A: [8, 7, 6, 5, 4, 3, 2, 1],
      B: [1, 2, 3, 4, 5, 6, 7, 8],
      C: ['A', 'B', 'C', 'D', 'E'],
      D: ['E', 'D', 'C', 'B', 'A']
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedUpperTooth: {
        A: [],
        B: [],
        C: [],
        D: []
      }
    };
  }

  onHandleUpperChange = (type, tag, checked) => {
    const { selectedUpperTooth } = this.state;
    const currentArr = selectedUpperTooth[type];

    const newArr = checked ?
      [...currentArr, tag] :
      currentArr.filter(item => item !== tag);
    selectedUpperTooth[type] = newArr;
    this.setState({
      selectedUpperTooth
    });
  }

  onHandleUpperFilter = (type, tag) => {
    const { selectedUpperTooth } = this.state;
    return selectedUpperTooth[type].indexOf(tag) !== -1;
  }

  render() {
    const { upperTooth } = this.props;

    return (
      <div className={styles.root}>
        <span className={styles.wrapper}>
          {
            upperTooth.A.map(item => (
              <CheckableTag
                key={item}
                checked={this.onHandleUpperFilter('A', item)}
                onChange={(checked) => this.onHandleUpperChange('A', item, checked)}
              >{item}</CheckableTag>
            ))
          }
        </span>
        <span className={styles.wrapper}>
          {
            upperTooth.B.map(item => (
              <CheckableTag
                key={item}
                checked={this.onHandleUpperFilter('B', item)}
                onChange={(checked) => this.onHandleUpperChange('B', item, checked)}
              >{item}</CheckableTag>
            ))
          }
        </span>
        <span className={styles.wrapper}>
          {
            upperTooth.C.map(item => (
              <CheckableTag
                key={item}
                checked={this.onHandleUpperFilter('C', item)}
                onChange={(checked) => this.onHandleUpperChange('C', item, checked)}
              >
                {item}
              </CheckableTag>
            ))
          }
        </span>
        <span className={styles.wrapper}>
          {
            upperTooth.D.map(item => (
              <CheckableTag
                key={item}
                checked={this.onHandleUpperFilter('D', item)}
                onChange={(checked) => this.onHandleUpperChange('D', item, checked)}
              >
                {item}
              </CheckableTag>
            ))
          }
        </span>
      </div>
    );
  }
}
