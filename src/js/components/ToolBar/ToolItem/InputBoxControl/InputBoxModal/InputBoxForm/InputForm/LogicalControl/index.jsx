import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Radio,
  Transfer,
  Button
} from 'antd';
// 控制条件
import ControlCondition from './ControlCondition';
// 获取所有实体
import getEntities from './../../../../../../../../customUtils/getEntities';

const RadioGroup = Radio.Group;

export default class LogicalControl extends React.Component {
  static PropTypes = {
    controlID: PropTypes.string.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      controlConditions: [], // 控制条件组
      isShow: true, // 目标控件显示
      allEntitys: [], // 所有实体
      targetKeys: [], // 受控实体Key值
      selectedKeys: [] // 已选中的项
    };
  }

  componentWillMount() {
    if (this.props.logicalControl) {
      const {
        controlConditions,
        isShow,
        allEntitys,
        targetKeys,
        selectedKeys
      } = this.props.logicalControl;

      this.setState({
        controlConditions,
        isShow,
        allEntitys,
        targetKeys,
        selectedKeys
      });
    }
  }

  componentDidMount() {
    // 获取所有实体
    const allEntitys = this.getAllEntityMap();
    this.setState({ allEntitys }); //eslint-disable-line
  }

  onControlConditionChange = (item, index) => {
    // 控制条件变更的回调
    const { controlConditions } = this.state;
    controlConditions[index] = item;
    this.setState({
      controlConditions
    });
    setTimeout(() => this.props.onChange(this.state), 0);
  }

  onAddCondition = () => {
    // 添加控制条件
    const { controlConditions } = this.state;
    this.setState({
      controlConditions: [
        ...controlConditions,
        {
          targetEntityKey: '', // 目标实体key
          itselfEntitykey: '', // 当前实体key
          condition: '===', // 控制条件
          logicalOperater: '&&' // 逻辑条件
        }
      ]
    });
  }

  onRemoveCondition = () => {
    // 移除控制条件
    const { controlConditions } = this.state;
    controlConditions.pop();
    this.setState({
      controlConditions
    });
  }

  onRadioChange = (e) => {
    // 显示隐藏
    this.setState({ isShow: e.target.value });
    setTimeout(() => this.props.onChange(this.state), 0);
  }

  onReload = () => {
    // 重置选项
    const newEntities = this.getAllEntityMap();
    this.setState({
      allEntitys: newEntities,
      targetKeys: []
    });
    setTimeout(() => this.props.onChange(this.state), 0);
  }

  onSelectedChange = (sourceKeys, targetKeys) => {
    // 选中项改变时的回调
    this.setState({ selectedKeys: [...sourceKeys, ...targetKeys] });
    setTimeout(() => this.props.onChange(this.state), 0);
  }

  onTransferChange = (targetKeys) => {
    // 切换时的回调
    this.setState({ targetKeys });
    setTimeout(() => this.props.onChange(this.state), 0);
  }

  getAllEntityMap = () => {
    // 获取所有实体
    const { editorState } = this.props;
    const allEntities = getEntities(editorState);
    const allEntitys = allEntities.map(item => ({
      key: item.entityKey,
      type: item.entity.toJS().data.controlID,
      title: item.entity.toJS().data.controlName,
      value: item.entity.toJS().data.defaultVal
    }));
    return allEntitys;
  }

  renderTransferItem = (item) => {
    let type;
    let value = item.value;
    switch (item.type) {
      case 'TextInput':
        type = '文本输入框';
        break;
      case 'DateInput':
        type = '日期输入框';
        value = moment(value).format('YYYY-MM-DD HH:mm');
        break;
      case 'SelectionInput':
        type = '下拉菜单输入框';
        break;
      case 'SelectionMultipleInput':
        type = '下拉多选输入框';
        break;
      case 'ChecBoxInput':
        type = '复选框';
        break;
      case 'RadioBoxInput':
        type = '单选框';
        break;
      default:
        type = '';
    }
    const customItem = (
      <span
        title={`${type} 控件名:${item.title} - 控件值:${value}`}
      >
        {item.title} - {value}
      </span>
    );

    return {
      label: customItem,
      value: item.title
    };
  }

  renderTransferFooter = () => {
    return (
      <Button
        size="small"
        style={{ float: 'right', margin: 5 }}
        onClick={this.onReload}
      >
        重 置
      </Button>
    );
  }

  render() {
    const {
      isShow,
      allEntitys,
      targetKeys,
      selectedKeys,
      controlConditions
    } = this.state;
    return (
      <Row gutter={10}>
        <Col span={24}>
          {
            controlConditions.map((item, index) => (
              <ControlCondition
                controlID={this.props.controlID}
                index={index}
                key={`condition-${index}`}
                onChange={this.onControlConditionChange}
                condition={item.condition}
                itselfEntityKey={item.itselfEntityKey}
                targetEntityKey={item.targetEntityKey}
                logicalOperater={item.logicalOperater}
                controlConditions={controlConditions}
                allEntitys={allEntitys}
              />
            ))
          }
          <Button.Group>
            <Button
              size="small"
              icon="plus"
              type="primary"
              title="添加控制条件"
              onClick={this.onAddCondition}
              disabled={controlConditions.length >= 3}
            />
            <Button
              size="small"
              icon="minus"
              type="danger"
              title="移除控制条件"
              onClick={this.onRemoveCondition}
              disabled={controlConditions.length === 1}
            />
          </Button.Group>
        </Col>
        <Col span={24}>
          <span style={{ marginRight: 20, color: '#333' }}>操作: </span>
          <RadioGroup
            value={isShow}
            onChange={this.onRadioChange}
          >
            <Radio value="show">显示</Radio>
            <Radio value="hidden">隐藏</Radio>
          </RadioGroup>
        </Col>
        <Col span={24}>
          <Transfer
            showSearch
            dataSource={allEntitys}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            titles={['全部控件', '受控控件']}
            notFoundContent="列表为空"
            onChange={this.onTransferChange}
            onSelectChange={this.onSelectedChange}
            render={this.renderTransferItem}
            searchPlaceholder="查找控件"
            footer={this.renderTransferFooter}
            listStyle={{
              width: '45%',
              height: 250
            }}
          />
        </Col>
      </Row>
    );
  }
}
