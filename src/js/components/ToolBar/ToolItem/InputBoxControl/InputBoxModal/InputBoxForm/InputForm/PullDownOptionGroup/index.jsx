import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Button
} from 'antd';
import SelectItem from './SelectItem';
import TabTitle from './TabTitle';

const TabPane = Tabs.TabPane;
export default class PullDownOptionGroup extends React.Component {
  static propTypes = {
    controlID: PropTypes.string.isRequired,
    defaultVal: PropTypes.string,
    onSetDefaultVal: PropTypes.func.isRequired,
    onAddDefaultVal: PropTypes.func.isRequired,
    onCleanDefaultVal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectTabs: this.props.pullDownOptionGroup.selectTabs,
      activeKey: this.props.pullDownOptionGroup.currentActiveKey,
    };
  }

  componentWillMount() {
    if (this.props.pullDownOptionGroup.selectTabs.length === 0) {
      this.setState({
        selectTabs: [
          { title: '默认选项', key: 0, group: 0, content: [], closable: false }
        ]
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectTabs } = nextProps;
    if (selectTabs !== this.props.selectTabs) {
      this.setState({
        selectTabs
      });
    }
  }

  onTabsChange = (activeKey) => {
    // 选项卡切换回调
    this.setState({
      activeKey
    });
  }

  onHandleEditor = (targetKey, action) => {
    this[action](targetKey);
  }

  onSelectItemChange = (selectItems) => {
    // 选项组内部项目改变时的回调
    const { selectTabs, activeKey } = this.state;
    const newTabs = selectTabs.map(panel => {
      if (`tab-${panel.key}` === activeKey) {
        panel.content = selectItems;
        return panel;
      }
      return panel;
    });
    this.setState({ selectTabs: newTabs });
    setTimeout(() => {
      this.props.onChange({
        selectTabs: this.state.selectTabs,
        currentActiveKey: this.state.activeKey
      });
    }, 0);
  }

  add = () => {
    // 添加分组并切换到当前分组
    const { selectTabs } = this.state;
    const group = selectTabs[selectTabs.length - 1].group + 1;
    const key = selectTabs[selectTabs.length - 1].key + 1;
    const tabTitle = (<TabTitle title={`分组-${group}`} />);
    const activeKey = `tab-${key}`;
    selectTabs.push({ title: tabTitle, content: [], key, group });
    const newTabs = selectTabs.slice(0);
    this.setState({
      selectTabs: newTabs,
      activeKey
    });
    this.props.onChange({
      selectTabs: newTabs,
      currentActiveKey: activeKey
    });
  }

  remove = (targetKey) => {
    // 移除当前分组并切换到前一个分组
    let { activeKey, selectTabs } = this.state;
    let lastIndex;
    selectTabs.forEach((panel, index) => {
      if (`tab-${panel.key}` === targetKey) {
        lastIndex = index - 1;
      }
    });
    selectTabs = selectTabs.filter(panel => `tab-${panel.key}` !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = `tab-${selectTabs[lastIndex].key}`;
    }
    this.setState({
      selectTabs,
      activeKey
    });
    this.props.onChange({
      selectTabs,
      currentActiveKey: activeKey
    });
  }

  render() {
    const { selectTabs, activeKey } = this.state;
    const {
      controlID,
      defaultVal,
      onSetDefaultVal,
      onAddDefaultVal,
      onCleanDefaultVal
    } = this.props;

    const tabBarExtraContent = (
      <Button
        title="添加分组"
        type="primary"
        size="small"
        icon="plus"
        onClick={this.add}
      />
    );

    return (
      <Tabs
        hideAdd
        type="editable-card"
        onChange={this.onTabsChange}
        onEdit={this.onHandleEditor}
        tabBarExtraContent={tabBarExtraContent}
        activeKey={activeKey}
      >
        {
          selectTabs.map((panel) => {
            return (
              <TabPane
                key={`tab-${panel.key}`}
                tab={panel.title}
                onChange={this.onTabsChange}
                closable={panel.closable}
              >
                <SelectItem
                  controlID={controlID}
                  selectItems={panel.content}
                  defaultVal={defaultVal}
                  onSetDefaultVal={onSetDefaultVal}
                  onAddDefaultVal={onAddDefaultVal}
                  onCleanDefaultVal={onCleanDefaultVal}
                  onChange={this.onSelectItemChange}
                />
              </TabPane>);
          })
        }
      </Tabs>
    );
  }
}
