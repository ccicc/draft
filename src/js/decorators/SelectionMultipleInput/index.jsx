/*

  global
  document: false

*/

import React from 'react';
import {
  Dropdown,
  Menu,
  Icon
} from 'antd';
import { PopupBox } from './../../components/Common';
import styles from './index.less';

const Item = Menu.Item;

export default class SelectionMultipleInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: false
    };
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onBodyClick, false);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onBodyClick, false);
  }

  onBodyClick = (e) => {
    if (e.target && e.target.matches('li.ant-dropdown-menu-item')) {
      return;
    }
    this.setState({
      isExpand: false
    });
  }

  onHandleExpand = () => {
    this.setState({
      isExpand: true
    });
  }

  onSelectValueChange = (options) => {
    // 增减子项并更新contentState对象
    const { entityKey, contentState } = this.props;
    const entityData = contentState.getEntity(entityKey).getData();
    let collectionItems = entityData.defaultVal.split(',');
    if (collectionItems.every(item => options.key !== item)) {
      collectionItems.push(options.key);
    } else {
      collectionItems = collectionItems.filter(item => item !== options.key);
    }
    const newDefaultVal = collectionItems.join(',');
    contentState.replaceEntityData(
      entityKey,
      {
        ...entityData,
        defaultVal: newDefaultVal
      }
    );
    this.setState({
      update: true
    });
  }

  render() {
    const { isExpand } = this.state;
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
      <Menu
        multiple
        onClick={this.onSelectValueChange}
      >
        {
          selectItems.map((item) => (
            <Item
              key={item.val}
            >
              <span title={item.title}>{item.val}</span>
              {
                defaultVal.split(',').some(val => val === item.val) &&
                <Icon type="check" />
              }
            </Item>
          ))
        }
      </Menu>
    );

    return (
      <span className={styles.root}>
        <PopupBox
          editorCommand="selectionMultipleEditor"
          deleteCommand="selectionMultipleDelete"
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
          onClick={this.onHandleExpand}
        >
          <i className={styles.rim}> [ </i>
          <Dropdown
            overlay={menu}
            visible={isExpand}
            trigger={['click']}
            placement="bottomCenter"
          >
            <span style={{ color: entityColor }}>
              {
                defaultVal
                  ?
                  defaultVal.split(',').map((item, index) => {
                    if (index === defaultVal.split(',').length - 1 || (item === '')) {
                      return (<span key={index}>{item}</span>);
                    } else if (item === '未知') {
                      return '';
                    }
                    return (<span key={index}>{item}, </span>);
                  })
                  :
                  (<span>未 知</span>)
              }
            </span>
          </Dropdown>
          <i className={styles.rim}> ] </i>
          <span style={{ display: 'none' }}>{children}</span>
        </span>
      </span>
    );
  }
}
