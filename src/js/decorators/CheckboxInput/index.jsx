import React from 'react';
import { PopupBox } from './../../components/Common';
import styles from './index.less';

export default class CheckboxInput extends React.Component {
  onHandleChange = (e) => {
    const { checked, value } = e.target;
    const { entityKey, contentState } = this.props;
    const entityData = contentState.getEntity(entityKey).getData();
    let { selectedValues } = entityData.selectTodos;
    if (checked && selectedValues.indexOf(value) === -1) {
      selectedValues.push(value);
    } else {
      selectedValues = selectedValues.filter(item => item !== value);
    }
    contentState.replaceEntityData(
      entityKey,
      {
        ...entityData,
        selectTodos: {
          ...entityData.selectTodos,
          selectedValues
        }
      }
    );
    this.setState({
      updateData: true
    });
  }

  render() {
    const { entityKey, contentState, children } = this.props;
    const {
      controlID,
      controlName,
      describeVal,
      entityColor,
      selectTodos
    } = contentState.getEntity(entityKey).getData();
    const { items, selectedValues } = selectTodos;

    return (
      <span className={styles.root}>
        <PopupBox
          editorCommand="checkBoxInputEditor"
          deleteCommand="checkBoxInputDelete"
          controlID={controlID}
          controlName={controlName}
        >
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
        </PopupBox>
      </span>
    );
  }
}
