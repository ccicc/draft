import React from 'react';
import {
  Row,
  Col,
  Input,
  Radio,
  Select,
  Transfer,
  Button
} from 'antd';
import PropTypes from 'prop-types';
import getEntities from './../../../../../../../../customUtils/getEntities';

const Option = Select.Option;
const RadioGroup = Radio.Group;
export default class LogicalControl extends React.Component {
  static PropTypes = {
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.object.isRequired,
    defaultVal: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      defaultVal: this.props.defaultVal, // 当前控件值
      condition: '', // 判断条件
      judgeVal: '', // 条件值
      isShow: 'show', // 目标控件显示
      allEntitys: [], // 所有实体 { key: 'entitKey', type: '',title: '', desc: ''}
      targetEntityKeys: [], // 受控实体Key值
      selectedKeys: [] // 已选中的项
    };
  }

  componentDidMount() {
    // const { targetEntityKeys } = this.state;
    // 排除已在targetEntityKey中的实体
    const allEntitys = this.getAllEntityMap();
    // const unSelectedEntitys = allEntitys.filter(item => !targetEntityKeys.includes(item.key));
    this.setState({ allEntitys: allEntitys }); //eslint-disable-line
  }

  componentWillReceiveProps(nextProps) {
    const { defaultVal } = nextProps;
    if (defaultVal !== this.props.defaultVal) {
      this.setState({ defaultVal });
    }
  }

  onConditionChange = (value) => {
    this.setState({ condition: value });
    setTimeout(() => this.props.onChange(this.state), 0);
  }

  onJudgeValChange = (e) => {
    this.setState({ judgeVal: e.target.value });
    setTimeout(() => this.props.onChange(this.state), 0);
  }

  onRadioChange = (e) => {
    this.setState({ isShow: e.target.value });
    setTimeout(() => this.props.onChange(this.state), 0);
  }

  onReload = () => {
    // 重置选择
    const newEntities = this.getAllEntityMap();
    this.setState({
      allEntitys: newEntities
    });
  }

  onSelectedChange = (sourceKeys, targetKeys) => {
    // 选中项改变时的回调
    this.setState({ selectedKeys: [...sourceKeys, ...targetKeys] });
    setTimeout(() => this.props.onChange(this.state), 0);
  }

  onTransferChange = (targetKeys) => {
    // 切换时的回调
    this.setState({ targetEntityKeys: targetKeys });
    setTimeout(() => this.props.onChange(this.state), 0);
  }

  getAllEntityMap = () => {
    // 获取所有实体
    const { editorState } = this.props;
    const allEntities = getEntities(editorState);
    console.log(allEntities);
    const allEntitys = allEntities.map(item => ({
      key: item.entityKey,
      type: item.entity.toJS().data.controlID,
      title: item.entity.toJS().data.controlName,
      description: item.entity.toJS().data.describeVal
    }));
    return allEntitys;
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
      condition,
      judgeVal,
      defaultVal,
      allEntitys,
      targetEntityKeys
    } = this.state;

    return (
      <Row gutter={10}>
        <Col span={12}>
          <Input
            disabled
            size="default"
            addonBefore="控件值"
            value={defaultVal}
          />
        </Col>
        <Col span={4}>
          <Select
            mode="combobox"
            notFoundContent=""
            value={condition}
            onChange={this.onConditionChange}
          >
            <Option value=">">大于</Option>
            <Option value="<">小于</Option>
            <Option value="==">等于</Option>
            <Option value="!=">不等于</Option>
            <Option value=">=">大于等于</Option>
            <Option value="<=">小于等于</Option>
          </Select>
        </Col>
        <Col span={8}>
          <Input
            size="default"
            addonBefore="判断值"
            value={judgeVal}
            onChange={this.onJudgeValChange}
          />
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
            targetKeys={targetEntityKeys}
            titles={['全部控件', '受控控件']}
            notFoundContent="列表为空"
            listStyle={{ width: '45%' }}
            onChange={this.onTransferChange}
            onSelectChange={this.onSelectedChange}
            render={item => `${item.title || '无'} - ${item.description || '无'}`}
            searchPlaceholder="查找控件"
            footer={this.renderTransferFooter}
          />
        </Col>
      </Row>
    );
  }
}
