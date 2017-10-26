import React from 'react';
import { PopupBox } from './../../components/Common';
import styles from './index.less';

export default class TextInput extends React.Component {
  render() {
    const { entityKey, contentState, children } = this.props;
    const {
      controlID,
      controlName,
      defaultVal,
      describeVal,
      entityColor
    } = contentState.getEntity(entityKey).getData();

    return (
      <span
        className={styles.root}
        onClick={this.onHandleClick}
      >
        <PopupBox
          editorCommand="textInputEditor"
          deleteCommand="textInputDelete"
          controlID={controlID}
          controlName={controlName}
        >
          {controlName && <span className={styles.controlName}>{controlName} : </span>}
        </PopupBox>
        <span
          className={styles.controlVal}
          title={describeVal}
        >
          <i className={styles.rim}> [ </i>
          <span style={{ color: entityColor }}>{defaultVal}</span>
          <i className={styles.rim}> ] </i>
          <span style={{ display: 'none' }}>{children}</span>
        </span>
      </span>
    );
  }
}
