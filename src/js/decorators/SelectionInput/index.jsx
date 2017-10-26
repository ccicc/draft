import React from 'react';
import { EditorState } from 'draft-js';
import {
  Dropdown,
  Menu
} from 'antd';
import { PopupBox } from './../../components/Common';
import styles from './index.less';

const Item = Menu.Item;
export default class SelectionInput extends React.Component {
  onSelectValueChange = (props) => {
    const { entityKey, contentState, editorState, onEditorStateChange } = this.props;
    const newContentState = contentState.mergeEntityData(
      entityKey,
      { defaultVal: props.key }
    );
    const newState = EditorState.push(editorState, newContentState, 'change-block-data');
    onEditorStateChange(newState);
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
      entityColor,
      selectItems
    } = contentState.getEntity(entityKey).getData();

    const menu = (
      <Menu onClick={this.onSelectValueChange}>
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
              onClick={this.onHandleClick}
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
          >
            <span style={{ color: entityColor }}>{defaultVal}</span>
          </Dropdown>
          <i className={styles.rim}> ] </i>
          <span style={{ display: 'none' }}>{children}</span>
        </span>
      </span>
    );
  }
}
