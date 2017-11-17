import React from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import {
  Dropdown,
  Menu
} from 'antd';
import logicalControlHOC from './../LogicalControlHOC';
import styles from './index.less';

const Item = Menu.Item;

class SelectionInput extends React.Component {
  static propTypes = {
    entityKey: PropTypes.string,
    contentState: PropTypes.object,
    children: PropTypes.array,
    onLogicalControl: PropTypes.func.isRequired,
    handleReadOnly: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isEditor: false,
      value: '',
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
      controlShow: controlShow !== 'hidden'
    });
  }

  componentDidMount() {
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

  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};
    const thisState = this.state || {};
    if (
      Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length
    ) {
      return true;
    }
    for (const key in nextProps) {
      if (nextProps.hasOwnProperty(key) && !is(thisProps[key], nextProps[key])) {
        return true;
      }
    }
    for (const key in nextState) {
      if (nextState.hasOwnProperty(key) && !is(thisState[key], nextState[key])) {
        return true;
      }
    }
    return false;
  }

  onHandleValueChange = (e) => {
    const { value } = e.target;
    this.setState({
      value
    });
  }

  onDoubleClick = () => {
    // 双击切换输入框
    this.setState({
      isEditor: true
    });
    this.props.handleReadOnly(true);
    this.input && this.input.focus();
  }

  onHandleInputBlur = (e) => {
    // 输入框失去焦点时更新实体数据defaultVal
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
      isEditor: false,
      value: e.target.value || '未知'
    });
    this.props.onLogicalControl(e.target.value);
    this.props.handleReadOnly(false);
  }

  onSelectValueChange = (props) => {
    // 选中项改变时更新entityData
    const { entityKey, contentState } = this.props;
    const data = contentState.getEntity(entityKey).getData();
    contentState.replaceEntityData(
      entityKey,
      {
        ...data,
        defaultVal: props.key
      }
    );
    this.setState({
      isVisible: false,
      value: props.key
    });
    this.props.onLogicalControl(props.key);
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
    const { isVisible, isEditor, value, controlShow } = this.state;
    const { entityKey, contentState, children } = this.props;
    const {
      defaultVal,
      describeVal,
      entityColor,
      pullDownOptionGroup
    } = contentState.getEntity(entityKey).getData();
    const { selectTabs } = pullDownOptionGroup;

    const inputContent = (
      <input
        autoFocus // eslint-disable-line
        type="text"
        value={value}
        ref={element => this.input = element}
        className={styles.input}
        onBlur={this.onHandleInputBlur}
        onChange={this.onHandleValueChange}
        placeholder="输入自定义值"
      />
    );

    const menu = (
      <Menu
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
              >{tab.title}</Item>
              {
                tab.content.map(item => (
                  <Item
                    key={item.val}
                    title={item.title}
                  >
                    {item.val}
                  </Item>
                ))
              }
              <Menu.Divider />
            </Menu>
          ))
        }
      </Menu>
    );

    const selectionInputContent = controlShow &&
      (
        <span className={styles.root}>
          <span
            className={styles.controlVal}
            title={describeVal}
          >
            <i className={styles.rim}> [ </i>
            {
              isEditor
                ?
                inputContent
                :
                (<Dropdown
                  overlay={menu}
                  placement="bottomCenter"
                  visible={isVisible}
                  trigger={['click']}
                  onVisibleChange={this.onHandleVisibleChange}
                >
                  <span
                    style={{ color: entityColor }}
                    onDoubleClick={this.onDoubleClick}
                    onClick={this.onHandleClick}
                  >
                    {defaultVal}
                  </span>
                </Dropdown>)
            }
            <i className={styles.rim}> ] </i>
            <span style={{ display: 'none' }}>{children}</span>
          </span>
        </span>
      );

    return selectionInputContent;
  }
}

export default logicalControlHOC(SelectionInput);
