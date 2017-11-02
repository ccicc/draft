import React from 'react';
import {
  Tabs,
  Button
} from 'antd';
import SelectItem from './SelectItem';
import TabTitle from './TabTitle';

const TabPane = Tabs.TabPane;
export default class PullDownOptionGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectTabs: this.props.pullDownOptionGroup.selectTabs,
      activeKey: this.props.pullDownOptionGroup.currentActiveKey,
    };
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
        currentActiveKey: this.state.currentActiveKey
      });
    }, 0);
  }

  add = () => {
    // 添加分组并切换到当前分组
    const { selectTabs } = this.state;
    const group = selectTabs[selectTabs.length - 1].group + 1;
    const key = selectTabs[selectTabs.length - 1].key + 1;
    const tabTitle = (<TabTitle title={`分组-${group}`} />);
    selectTabs.push({ title: tabTitle, content: [], key, group });
    this.setState({
      selectTabs,
      activeKey: `tab-${key}`
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
            return (<TabPane
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
