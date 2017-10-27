import React from 'react';
import { PopupBox } from './../../components/Common';
import styles from './index.less';

export default class RadioboxInput extends React.Component {
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
    this.setState({});
  };

  render() {
    const { entityKey, contentState } = this.props;
    const {
      controlID,
      controlName,
      describeVal,
      entityColor,
      selectTodos
    } = contentState.getEntity(entityKey).getData();
    const { items, currentValue } = selectTodos;
    return (
      <span className={styles.root}>
        <PopupBox
          editorCommand="radioBoxInputEditor"
          deleteCommand="radioBoxInputDelete"
          controlID={controlID}
          controlName={controlName}
        >
          {
            controlName &&
            <span
              className={styles.controlName}
              onClick={this.onHandleClick}
            >{controlName}: </span>
          }
        </PopupBox>
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
                    checked={item.value === currentValue}
                    onChange={this.onHandleChange}
                  />
                  {item.value}、
                </label>
              </span>
            ))
          }
          <span className={styles.rim}> ] </span>
        </span>
      </span>
    );
  }
}
