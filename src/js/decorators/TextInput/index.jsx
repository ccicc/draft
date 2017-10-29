import React from 'react';
import {
  Popover
} from 'antd';
import { PopupBox } from './../../components/Common';
import styles from './index.less';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false
    };
  }
  onHandleVisibleChange = () => {
    const { contentState, entityKey } = this.props;
    const entityData = contentState.getEntity(entityKey).getData();
    if (this.input && (this.input.value !== '')) {
      contentState.replaceEntityData(
        entityKey,
        {
          ...entityData,
          defaultVal: this.input.value
        }
      );
    }
    this.setState({
      update: true
    });
  }

  render() {
    const { entityKey, contentState, children } = this.props;
    const {
      controlID,
      controlName,
      defaultVal,
      describeVal,
      entityColor
    } = contentState.getEntity(entityKey).getData();

    const content = (
      <input
        type="text"
        ref={element => this.input = element}
        className={styles.editorInput}
      />
    );

    return (
      <span
        className={styles.root}
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
          onClick={this.onHandleClick}
        >
          <Popover
            placement="topLeft"
            trigger="click"
            content={content}
            onVisibleChange={this.onHandleVisibleChange}
          >
            <i className={styles.rim}> [ </i>
            <span
              style={{ color: entityColor }}
              className={styles.editorWrapper}
            >
              {defaultVal}
            </span>
            <i className={styles.rim}> ] </i>
            <span style={{ display: 'none' }}>{children}</span>
          </Popover>
        </span>
      </span>
    );
  }
}
