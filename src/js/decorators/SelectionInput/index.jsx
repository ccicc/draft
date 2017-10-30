import React from 'react';
import {
  Dropdown,
  Menu
} from 'antd';
import { PopupBox } from './../../components/Common';
import styles from './index.less';

const Item = Menu.Item;
export default class SelectionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  onHandleInputBlur = (e) => {
    const { entityKey, contentState } = this.props;
    const entityData = contentState.getEntity(entityKey).getData();
    contentState.replaceEntityData(
      entityKey,
      {
        ...entityData,
        defaultVal: e.target.value || '未知'
      }
    );
    this.setState({
      isVisible: false
    });
  }

  onSelectValueChange = (props) => {
    const { entityKey, contentState } = this.props;
    const data = contentState.getEntity(entityKey).getData();
    contentState.replaceEntityData(
      entityKey,
      {
        ...data,
        defaultVal: props.key
      }
    );
    if (props.key !== 'input') {
      this.setState({
        isVisible: false,
        update: true
      });
    }
  }

  onHandleClick = () => {
    this.setState({
      isVisible: true
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
      entityColor,
      selectItems
    } = contentState.getEntity(entityKey).getData();

    const menu = (
      <Menu onClick={this.onSelectValueChange}>
        <Item key="input">
          <input
            type="text"
            ref={element => this.input = element}
            className={styles.input}
            onBlur={this.onHandleInputBlur}
            placeholder="输入自定义值"
          />
        </Item>
        {
          selectItems.map(item => (
            <Item
              key={item.val}
              disabled={item.val === defaultVal}
            >
              <span title={item.title}>{item.val}</span>
            </Item>
          ))
        }
      </Menu>
    );

    return (
      <span className={styles.root}>
        <PopupBox
          editorCommand="selectionInputEditor"
          deleteCommand="selectionInputDelete"
          controlID={controlID}
          controlName={controlName}
        >
          {
            controlName &&
            <span
              className={styles.controlName}
            >{controlName}: </span>
          }
        </PopupBox>
        <span
          className={styles.controlVal}
          title={describeVal}
          onClick={this.onSelectClick}
        >
          <i className={styles.rim}> [ </i>
          <Dropdown
            overlay={menu}
            trigger={['click']}
            placement="bottomCenter"
            visible={isVisible}
            onVisibleChange={this.onHandleVisibleChange}
          >
            <span
              style={{ color: entityColor }}
              onClick={this.onHandleClick}
            >
              {defaultVal}
            </span>
          </Dropdown>
          <i className={styles.rim}> ] </i>
          <span style={{ display: 'none' }}>{children}</span>
        </span>
      </span>
    );
  }
}
