import React from 'react';
import moment from 'moment';
import { is, List, Map } from 'immutable';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Radio,
  Transfer,
  Button,
} from 'antd';
// 控制条件
import ControlCondition from './ControlCondition';
// 获取所有实体
import getEntities from './../../../../../../../../customUtils/getEntities';
import styles from './index.less';

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
      controlConditions: [], // 控制条件项
      allEntitys: [], // 所有实体
      isShow: 'show', // 目标控件显示
      targetKeys: [], // 受控实体Key值
      selectedKeys: [], // 已选中的项
      logicalControlGroup: [], // 控制条件组
      isShowEntityPanel: true, // 是否显示选择实体面板
      isEditor: false // 是否编辑
    };
  }

  componentWillMount() {
    if (this.props.logicalControl) {
      const {
        isShow,
        allEntitys,
        targetKeys,
        selectedKeys,
        logicalControlGroup
      } = this.props.logicalControl;
      this.setState({
        isShow,
        allEntitys,
        targetKeys,
        selectedKeys,
        logicalControlGroup
      });
    }
  }

  componentDidMount() {
    // 获取所有实体
    const allEntitys = this.getAllEntityMap();
    this.setState({ allEntitys }); //eslint-disable-line
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

  onControlConditionChange = (item, index) => {
    // 控制条件项变更的回调
    const { controlConditions } = this.state;
    const $$controlConditions = List(controlConditions);
    const newControlConditions = $$controlConditions.set(index, item).toJS();
    this.setState({
      controlConditions: newControlConditions
    });
  }

  onAddCondition = () => {
    // 添加控制条件项
    const { controlConditions } = this.state;
    const $$controlConditions = List(controlConditions);
    const newControlConditions =
      $$controlConditions.push(
        {
          targetEntityKey: '', // 目标实体key
          itselfEntitykey: '', // 当前实体key
          condition: '===', // 控制条件
          logicalOperater: '&&' // 逻辑条件
        }
      ).toJS();
    this.setState({
      controlConditions: newControlConditions,
      isShowEntityPanel: true
    });
  }

  onRemoveCondition = () => {
    // 移除控制条件项
    const { controlConditions } = this.state;
    const $$controlConditions = List(controlConditions);
    const newControlConditions = $$controlConditions.pop().toJS();
    this.setState({
      controlConditions: newControlConditions
    });
  }

  onAddLogicalGroup = () => {
    // 添加控制条件组
    const {
      isShow,
      controlConditions,
      targetKeys,
      logicalControlGroup
    } = this.state;
    const newLogicalControlGroup = List(logicalControlGroup).push({
      isShow,
      controlConditions,
      targetKeys
    }).toJS();
    this.setState({
      logicalControlGroup: newLogicalControlGroup,
      targetKeys: [],
      controlConditions: [],
      isShowEntityPanel: false
    });
    // 将值传递给form表单父组件
    this.props.onChange({
      logicalControlGroup: newLogicalControlGroup
    });
    console.log(newLogicalControlGroup);
  }

  onRemoveLogicalGroup = (index) => {
    // 删除控制条件组
    const { logicalControlGroup } = this.state;
    const newLogicalControlGroup = List(logicalControlGroup).delete(index).toJS();
    this.setState({
      logicalControlGroup: newLogicalControlGroup,
      isShowEntityPanel: false
    });
  }

  onEditorLogicalGroup = (index) => {
    // 编辑控制条件组
    const { logicalControlGroup } = this.state;
    const { targetKeys, controlConditions } = logicalControlGroup[index];
    this.setState({
      controlConditions,
      targetKeys,
      isShowEntityPanel: true,
      isEditor: true,
      currentIndex: index // 当前所修改的条件组索引
    });
  }

  onConfirmAlter = () => {
    const {
      isShow,
      currentIndex,
      targetKeys,
      controlConditions,
      logicalControlGroup
    } = this.state;
    const newLogicalControlGroup =
      List(logicalControlGroup).update(currentIndex, item => Map(item).merge({
        isShow,
        controlConditions,
        targetKeys,
      })).toJS();
    this.setState({
      logicalControlGroup: newLogicalControlGroup,
      targetKeys: [],
      controlConditions: [],
      isShowEntityPanel: false,
      isEditor: false
    });
  }

  onRadioChange = (e) => {
    // 受控控件的显示隐藏
    this.setState({ isShow: e.target.value });
  }

  onReload = () => {
    // 重置是否受控
    const newEntities = this.getAllEntityMap();
    this.setState({
      allEntitys: newEntities,
      targetKeys: []
    });
  }

  onSelectedChange = (sourceKeys, targetKeys) => {
    // 选中项改变时的回调
    this.setState({ selectedKeys: [...sourceKeys, ...targetKeys] });
  }

  onTransferChange = (targetKeys) => {
    // 切换时的回调
    this.setState({ targetKeys });
  }

  getInputType = (type) => {
    // 获取控件类型
    let inputType;
    switch (type) {
      case 'TextInput':
        inputType = '文本输入框';
        break;
      case 'DateInput':
        inputType = '日期输入框';
        break;
      case 'SelectionInput':
        inputType = '下拉单选输入框';
        break;
      case 'SelectionMultipleInput':
        inputType = '下拉多选输入框';
        break;
      case 'CheckBoxInput':
        inputType = '复选框';
        break;
      case 'RadioBoxInput':
        inputType = '单选框';
        break;
      default:
        inputType = '';
    }
    return inputType;
  }

  getAllEntityMap = () => {
    // 获取所有实体
    const { editorState } = this.props;
    const allEntities = getEntities(editorState);
    const allEntitys = allEntities.map(item => ({
      key: item.entityKey,
      type: item.entity.toJS().data.controlID,
      title: item.entity.toJS().data.controlName,
      value: item.entity.toJS().data.defaultVal,
      radioVal: item.entity.toJS().data.selectTodos.currentValue,
      checkboxVal: item.entity.toJS().data.selectTodos.selectedValues
    }));
    return allEntitys;
  }

  getEntityVal = (entityKey) => {
    // 通过entityKey获取指定实体值
    const { allEntitys } = this.state;
    if (entityKey == undefined || entityKey === '') {  // eslint-disable-line
      return '当前控件值';
    }
    const activeEntity = List(allEntitys).find(entity => entity.key === entityKey);
    let entityVal = activeEntity.value;
    if (activeEntity.type === 'SelectionMultipleInput') {
      entityVal = activeEntity.value.split(',').filter(val => val !== '未知').join(',');
    }
    if (activeEntity.type === 'CheckBoxInput') {
      entityVal = activeEntity.checkboxVal;
    }
    if (activeEntity.type === 'RadioBoxInput') {
      entityVal = activeEntity.radioVal;
    }
    if (moment.isMoment(activeEntity.defaultVal) || activeEntity.type === 'DateInput') {
      entityVal = moment(activeEntity.defaultVal).format('YYYY-MM-DD HH:mm');
    }
    return entityVal;
  }

  getTargetEntityVal = (item) => {
    // 获取目标实体值
    let targetVal = '';
    if (item.inputType === 'customVal') {
      targetVal = item.customVal || '';
    }
    if (item.inputType === 'dateVal') {
      targetVal = moment(item.dateVal).format('YYYY-MM-DD HH:mm');
    }
    if (item.inputType === 'targetKey') {
      targetVal = this.getEntityVal(item.targetEntityKey);
    }
    return targetVal;
  }

  renderTransferItem = (item) => {
    let value = item.value;
    if (moment.isMoment(value)) {
      // 如果值为moment类型，则格式化
      value = moment().format('YYYY-MM-DD HH-mm');
    }
    if (item.type === 'SelectionInput') {
      value = item.value.split(',').filter(val => val !== '未知').join(',');
    }
    if (item.type === 'SelectionMultipleInput') {
      value = item.value.split(',').filter(val => val !== '未知').join(',');
    }
    if (item.type === 'RadioBoxInput') {
      value = item.radioVal;
    }
    if (item.type === 'CheckBoxInput') {
      value = item.checkboxVal.join(',');
    }
    const customItem = (
      <span
        title={`${this.getInputType(item.type)}: 控件名:${value}`}
      >
        {this.getInputType(item.type)}:  {item.title}
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
      isEditor,
      allEntitys,
      targetKeys,
      selectedKeys,
      controlConditions,
      logicalControlGroup,
      isShowEntityPanel
    } = this.state;

    const logicalGroupContent = (
      <div>
        {
          logicalControlGroup.map((logicalItem, itemIndex) => {
            // 获取并合并控制条件
            const conditionItem = logicalItem
              .controlConditions
              .reduce((total, item, index, current) => {
                let itselfVal = this.getEntityVal(item.itselfEntityKey);
                let targetVal = this.getTargetEntityVal(item);
                targetVal = /^\d+$/.test(targetVal) ? targetVal : `'${targetVal}'`;
                itselfVal = (/^\d+$/.test(itselfVal) || itselfVal === '当前控件值') ? itselfVal : `'${itselfVal}'`;
                let operater = item.logicalOperater;
                if (current.length === 1 || (index === current.length - 1)) { operater = ''; }
                return (
                  <code className={styles.code}>
                    {total}({itselfVal} {item.condition} {targetVal})
                    <span className={styles.operater}> {operater} </span>
                  </code>
                );
              }, '');
            return (
              <div key={`item-${itemIndex}`}>
                <p>
                  条件组{itemIndex + 1}:
                  <span className={styles.conditionBtns}>
                    <Button
                      size="small"
                      icon="edit"
                      type="primary"
                      title="编辑"
                      style={{ marginRight: 10 }}
                      onClick={() => this.onEditorLogicalGroup(itemIndex)}
                    />
                    <Button
                      size="small"
                      icon="delete"
                      type="danger"
                      title="删除"
                      onClick={() => this.onRemoveLogicalGroup(itemIndex)}
                    />
                  </span>
                </p>
                <div className={styles.conditionItem}>
                  <p>
                    <span className={styles.conditionTitle}>控制条件: </span>
                    {conditionItem}
                  </p>
                  <p>
                    <span className={styles.conditionTitle}>是否显示: </span>
                    {logicalItem.isShow ? '显示' : '隐藏'}
                  </p>
                  <p>
                    <span className={styles.conditionTitle}>受控实体: </span>
                    <a onClick={() => this.onEditorLogicalGroup(itemIndex)}>查 看</a>
                  </p>
                </div>
              </div>
            );
          })
        }
      </div>
    );

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
                customVal={item.customVal}
                dateVal={item.dateVal}
                inputType={item.inputType}
                itselfEntityKey={item.itselfEntityKey}
                targetEntityKey={item.targetEntityKey}
                logicalOperater={item.logicalOperater}
                controlConditions={controlConditions}
                allEntitys={allEntitys}
                getInputType={this.getInputType}
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
        {
          isShowEntityPanel &&
          (
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
          )
        }
        {
          isShowEntityPanel &&
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
                height: 200
              }}
            />
          </Col>
        }
        <Col span={24}>
          {logicalGroupContent}
        </Col>
        <Col span={24}>
          {
            isShowEntityPanel &&
            <Button
              size="default"
              type="primary"
              title="添加控制条件组"
              style={{ width: '40%' }}
              onClick={this.onAddLogicalGroup}
              disabled={controlConditions.length === 0 || isEditor}
            >
              添加控制条件组
            </Button>
          }
          {
            isEditor &&
            <Button
              size="default"
              type="primary"
              title="确认修改"
              style={{ marginLeft: 10 }}
              onClick={this.onConfirmAlter}
            >
              确认修改
            </Button>
          }
        </Col>
      </Row>
    );
  }
}
