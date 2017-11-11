/*

  global
  document: false

*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  Menu,
  Icon,
  Button
} from 'antd';
import logicalControlHOC from './../LogicalControlHOC';

import styles from './index.less';

const Item = Menu.Item;

class SelectionMultipleInput extends React.Component {
  static propTypes = {
    entityKey: PropTypes.string,
    contentState: PropTypes.object,
    children: PropTypes.array,
    onLogicalControl: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isExpand: false,
      controlShow: true
    };
  }

  componentWillMount() {
    const { entityKey, contentState } = this.props;
    const {
      defaultVal,
      controlShow
    } = contentState.getEntity(entityKey).getData();
    this.setState({
      value: defaultVal,
      controwShow: controlShow !== 'hidden'
    });
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onBodyClick, false);
    this.props.onLogicalControl(this.state.value);
  }

  componentWillReceiveProps(nextProps) {
    const { entityKey, contentState } = nextProps;
    const {
      defaultVal,
      controlShow
    } = contentState.getEntity(entityKey).getData();
    this.setState({
      value: defaultVal,
      controlShow: controlShow !== 'hidden'
    });
    this.props.onLogicalControl(defaultVal);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onBodyClick, false);
  }

  onBodyClick = (e) => {
    if (e.target && (e.target.matches('li.ant-menu-item') || e.target.matches('span'))) {
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
    // 增减子项并更新到contentState对象
    const { entityKey, contentState } = this.props;
    const entityData = contentState.getEntity(entityKey).getData();
    let collectionItems = entityData.defaultVal.split(',');
    if (collectionItems.every(item => options.key !== item) && (options.key !== 'item-btn')) {
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
      value: newDefaultVal
    });
    this.props.onLogicalControl(newDefaultVal);
  }

  onSelectedAllClick = () => {
    // 全选
    const { entityKey, contentState } = this.props;
    const entityData = contentState.getEntity(entityKey).getData();
    const newDefaultVal = entityData.pullDownOptionGroup.selectTabs.map(tab => {
      return tab.content.map(item => item.val).join(',');
    }).join(',');

    contentState.replaceEntityData(
      entityKey,
      {
        ...entityData,
        defaultVal: newDefaultVal
      }
    );
    this.setState({
      value: newDefaultVal
    });
  }

  onClearItemClick = () => {
    // 全不选
    const { entityKey, contentState } = this.props;
    const entityData = contentState.getEntity(entityKey).getData();
    contentState.replaceEntityData(
      entityKey,
      {
        ...entityData,
        defaultVal: ''
      }
    );
    this.setState({
      value: ''
    });
  }

  render() {
    const { isExpand, value, controlShow } = this.state;
    const { entityKey, contentState, children } = this.props;
    const {
      describeVal,
      entityColor,
      pullDownOptionGroup,
      isPrefix,
      prefixSuffix
    } = contentState.getEntity(entityKey).getData();
    const { selectTabs } = pullDownOptionGroup;

    // 所有选项
    const allItems = selectTabs.length !== 0
      ?
      selectTabs
        .map(tab => tab.content)
        .reduce((total, item) => [...total, ...item])
        .map(item => item.val)
      :
      [];

    // 所有选中选项
    const allSelectedItems = value.split(',');

    // 所有未选中选项
    const allUnSelectItems = allItems.filter(item => !allSelectedItems.includes(item));

    const {
      activePrefix,
      activeSuffix,
      prefix,
      suffix,
      connector,
      separator
    } = prefixSuffix || {};

    const menu = (
      <Menu
        multiple
        onClick={this.onSelectValueChange}
      >
        {
          selectTabs.map((tab, index) => (
            <Menu
              key={`menu-${index}`}
              onClick={this.onSelectValueChange}
            >
              <Item
                key={`group-${index}`}
                disabled
              >
                {tab.title}
              </Item>
              {
                tab.content.map(item => (
                  <Item key={item.val}>
                    <span title={item.title}>{item.val}</span>
                    {
                      value.split(',').some(val => val === item.val) &&
                      <span className={styles.itemIcon}><Icon type="check" /></span>
                    }
                  </Item>
                ))
              }
              <Menu.Divider />
            </Menu>
          ))
        }
        <Item key="item-btn">
          <Button.Group
            style={{ width: '100%' }}
          >
            <Button
              size="small"
              style={{ width: '50%' }}
              onClick={this.onSelectedAllClick}
            >
              全选
            </Button>
            <Button
              size="small"
              style={{ width: '50%' }}
              disabled={value === ''}
              onClick={this.onClearItemClick}
            >
              全不选
            </Button>
          </Button.Group>
        </Item>
      </Menu>
    );

    const selectValue = isPrefix ?
      // 带有前后缀
      (
        <span style={{ color: entityColor }}>
          {/* 选中项 */}
          {
            allSelectedItems.map((item, index) => {
              if (item === '') {
                return '';
              } else if (item === '未知' || item.search(/^item_/g) !== -1) {
                return '';
              } else if (index === allSelectedItems.length - 1) {
                return (<span key={`selected-${index}`}>{activePrefix}{item}{activeSuffix}</span>);
              }
              return (<span key={`selected-${index}`}>{activePrefix}{item}{activeSuffix}{connector}</span>);
            })
          }
          {/* 分隔符 */}
          {
            (value !== '' && value !== '未知') && allUnSelectItems.length !== 0 &&
            separator
          }
          {/* 未选中项 */}
          {
            allUnSelectItems.map((item, index) => {
              if (item === '') {
                return '';
              } else if (item === '未知' || item.search(/^item_/g) !== -1) {
                return '';
              } else if (index === allUnSelectItems.length - 1) {
                return (<span key={`unSelected-${index}`}>{prefix}{item}{suffix}</span>);
              }
              return (<span key={`unSelected-${index}`}>{prefix}{item}{suffix}{connector}</span>);
            })
          }
        </span>
      )
      :
      // 不带前后缀
      (
        <span style={{ color: entityColor }}>
          {
            value
              ?
              allSelectedItems.map((item, index) => {
                // 最后一位不加连接符
                if (index === allSelectedItems.length - 1 || (item === '')) {
                  return (<span key={index}>{item}</span>);
                } else if (item === '未知' || item.search(/^item_/g) !== -1) {
                  return '';
                }
                return (<span key={index}>{item}、</span>);
              })
              :
              (<span>未 知</span>)
          }
        </span>
      );

    const selectionMultipleInputContent = controlShow &&
      (
        <span className={styles.root}>
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
              {selectValue}
            </Dropdown>
            <i className={styles.rim}> ] </i>
            <span style={{ display: 'none' }}>{children}</span>
          </span>
        </span>
      );

    return selectionMultipleInputContent;
  }
}

export default logicalControlHOC(SelectionMultipleInput);
