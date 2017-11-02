import React from 'react';
import PropTypes from 'prop-types';
import WrapperInputForm from './InputForm';

export default class InputBoxForm extends React.Component {
  static propTypes = {
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
      dateFormat: 'YYYY-MM-DD HH:mm', // 日期格式
      entityColor: '#333', // 控件实体颜色
      tags: [], // 标签
      dataType: { // 控件值的数据类型
        typeVal: 'string',
        minNum: 0, // 数值类型的默认最小值
        maxNum: 100 // 数值类型的默认最大值
      },
      isRequired: true, // 是否必填
      isReadOnly: false, // 是否只读
      currentActiveKey: 'tab-0', // 默认当前选中分组
      pullDownOptionGroup: { // 下拉菜单选项组
        selectTabs: [ // 选项卡分组
          { title: '默认选项组', content: [], key: 0, group: 0, closable: false }
        ],
        currentActiveKey: 'tab-0' // 当前选项卡
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
      entityData: this.props.entityData
    };
  }

  onHandleConfirm = (err, changeFields) => {
    const { onChange, onHiddenModal } = this.props;
    if (err) return false;
    console.log(changeFields);
    this.setState({
      entityData: {
        ...changeFields
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
    const { controlID, entityData } = this.state;
    const { config } = this.props;
    return (
      <WrapperInputForm
        {...entityData}
        config={config}
        controlID={controlID}
        onHandleConfirm={this.onHandleConfirm}
        onHandleCancel={this.onHandleCancel}
      />
    );
  }
}
