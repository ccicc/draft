import React from 'react';
import {
  Popover
} from 'antd';
import { PopupBox } from './../../components/Common';
import styles from './index.less';
/* eslint-disable */
export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onBodyClick, false);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onBodyClick, false);
  }

  onBodyClick = () => {
    const { contentState, entityKey } = this.props;
    const entityData = contentState.getEntity(entityKey).getData();
    if (this.input && this.input.value !== '') {
      contentState.replaceEntityData(
        entityKey,
        {
          ...entityData,
          defaultVal: this.input.value
        }
      )
    }
    this.setState({
      isVisible: false
    });
  }

  onHandleClick = () => {
    this.setState({
      isVisible: !this.state.isVisible
    });
  }

  onHandleVisibleChange = (visible) => {
    this.setState({
      isVisible: visible
    });
  }

  render() {
    const { isVisible } = this.state;
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
        ref={element => this.input = element}
        type="text"
        className={styles.editorInput}
      />
    )

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
          <Popover
            visible={isVisible}
            placement="topLeft"
            trigger="click"
            onVisibleChange={this.onHandleVisibleChange}
            content={content}
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
