import React from 'react';
import PropTypes from 'prop-types';
import WrapperInputForm from './InputForm';

export default class InputBoxForm extends React.Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired,
    controlID: PropTypes.string.isRequired,
    entityData: PropTypes.object,
    config: PropTypes.object.isRequired,
    selectionText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onHiddenModal: PropTypes.func.isRequired
  };
  static defaultProps = {
    controlID: 'TextInput',
    entityData: {
      controlID: 'TextInput', // 控件ID
      controlName: '', // 控件名
      defaultVal: undefined, // 控件值
      describeVal: '', // 控件描述
      score: 0, // 控件分数
      dateFormat: 'YYYY-MM-DD', // 日期格式
      entityColor: '#333', // 控件实体颜色
      tags: [], // 标签
      dataType: { // 控件值的数据类型
        typeVal: 'string',
        minNum: 0, // 数值类型的默认最小值
        maxNum: 100, // 数值类型的默认最大值,
        regexp: '', // 自定义正则校验,
        regexpMsg: '提示信息' // 正则校验提示信息
      },
      isRequired: true, // 是否必填
      isReadOnly: false, // 是否只读
      isPrefix: false, // 有无前后缀,
      isLogicalControl: false, // 有无逻辑控制
      prefixSuffix: {
        activePrefix: '有', // 选中前缀
        prefix: '无', // 未选中前缀
        activeSuffix: '', // 选中后缀
        suffix: '', // 未选中后缀
        connector: '、', // 连接符
        separator: '，' // 分隔符
      },
      currentActiveKey: 'tab-0', // 默认当前选中分组
      pullDownOptionGroup: { // 下拉菜单选项组
        selectTabs: [],
        currentActiveKey: 'tab-0' // 当前选项卡
      },
      logicalControl: {
        controlConditions: [
          {
            condition: '===',
            itselfEntityKey: '',
            targetEntityKey: '',
            logicalOperater: '&&',
            customVal: '',
            dateVal: '',
            inputType: 'targetKey'
          }
        ], // 控制条件
        isShow: 'show',
        allEntitys: [], // 所有实体
        targetKeys: [], // 受控实体
        selectedKeys: [] // 选中实体
      },
      selectTodos: {
        items: [],
        selectedValues: [],
        currentValue: ''
      }
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      controlID: this.props.controlID,
      entityData: this.props.entityData,
    };
  }

  // from表单回调
  onHandleConfirm = (err, changeFields) => {
    const { onChange, onHiddenModal } = this.props;
    if (err) return false;
    console.log(changeFields);
    this.setState({
      entityData: {
        changeFields
      }
    });
    onChange(changeFields.controlID, changeFields);
    onHiddenModal();
  }

  onHandleCancel = () => {
    const { onHiddenModal } = this.props;
    onHiddenModal();
  }

  render() {
    const { controlID, entityData, editorState, onEditorStateChange } = this.props;
    const { config } = this.props;

    return (
      <WrapperInputForm
        {...entityData}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        config={config}
        controlID={controlID}
        onHandleConfirm={this.onHandleConfirm}
        onHandleCancel={this.onHandleCancel}
      />
    );
  }
}
