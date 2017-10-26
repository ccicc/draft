import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { PopupBox } from './../../components/Common';
import styles from './index.less';

export default class CheckboxInput extends React.Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired,
  };

  onHandleChange = (e) => {
    // 存在bug
    const { checked, value } = e.target;
    const { entityKey, contentState, editorState, onEditorStateChange } = this.props;
    const { selectTodos } = contentState.getEntity(entityKey).getData();
    let { selectedValues } = selectTodos;
    if (checked && selectedValues.indexOf(value) === -1) {
      selectedValues.push(value);
    } else {
      selectedValues = selectedValues.filter(item => item !== value);
    }
    const newContentState = contentState.mergeEntityData(
      entityKey,
      { selectTodos: { ...selectTodos, selectedValues } }
    );
    onEditorStateChange(EditorState.push(editorState, newContentState, 'insert-cahracter'));
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
          {
            controlName &&
            <span
              className={styles.controlName}
              onClick={this.onHandleClick}
            >{controlName}：</span>
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
                <label className={styles.itemLable}>
                  <input
                    className={styles.checkbox}
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
  }
}
