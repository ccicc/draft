import React from 'react';
import { is } from 'immutable';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  Select,
  Input,
  Button,
  Switch,
  Tabs,
  DatePicker
} from 'antd';

// 颜色选择
import ColorPicker from './../../../../../../Common/ColorPicker';
// 下拉选项组
import PullDownOptionGroup from './PullDownOptionGroup';
// 文本类型
import SelectType from './SelectType';
// 单选，多选选项组
import SelectTodo from './SelectTodo';
// 前后缀
import PrefixSuffix from './PrefixSuffix/';
// 逻辑质控
import LogicalControl from './LogicalControl';

import styles from './index.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class InputForm extends React.Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired,
    config: PropTypes.object,
    controlID: PropTypes.string.isRequired,
    defaultVal: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    onHandleConfirm: PropTypes.func.isRequired,
    onHandleCancel: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      defaultVal: this.props.defaultVal,
      dateFormat: this.props.dataFormat,
      isRequired: this.props.isRequired,
      isPrefix: this.props.isPrefix,
      isLogicalControl: this.props.isLogicalControl,
      dataTypeRules: []
    };
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

  onSwitchChange = (checked) => {
    // 是否必填
    this.setState({
      isRequired: checked
    });
  }

  onIsPrefixChange = (checked) => {
    // 有无前缀
    this.setState({
      isPrefix: checked
    });
  }

  onIsLogicalChange = (checked) => {
    // 逻辑质控
    this.setState({
      isLogicalControl: checked
    });
  }

  onSetDefaultVal = (value) => {
    // 设置默认值
    const { controlID } = this.props;
    const { setFieldsValue } = this.props.form;
    if (controlID === 'SelectionInput' || controlID === 'SelectionMultipleInput') {
      setFieldsValue({
        defaultVal: value,
      });
    }
    this.setState({
      defaultVal: value
    });
  }

  onAddDefaultVal = (value) => {
    // 多选下拉框添加默认值
    const { getFieldValue, setFieldsValue } = this.props.form;
    const defaultVal = getFieldValue('defaultVal');
    let newDefaultVal = '';
    if (!defaultVal || defaultVal === '未知') {
      newDefaultVal = value;
    } else if (defaultVal.split(',').some(item => item === value)) {
      newDefaultVal = defaultVal;
    } else {
      newDefaultVal = `${defaultVal},${value}`;
    }
    setFieldsValue({
      defaultVal: newDefaultVal
    });
    this.setState({
      defaultVal: newDefaultVal
    });
    return newDefaultVal;
  }

  onCleanDefaultVal = () => {
    // 清除输入框默认值
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ defaultVal: '未知' });
    this.setState({
      defaultVal: ''
    });
  }

  onDefaultValChange = (prop) => {
    // 控件受控方法
    if (this.props.controlID === 'DateInput') {
      this.setState({ defaultVal: prop.format('YYYY-MM-DD HH:mm') });
      return;
    }
    this.setState({ defaultVal: prop.target.value });
  }

  onDateFormatChange = (value) => {
    // 日期格式更改
    this.setState({
      dateFormat: value
    });
  }

  getRules = (dataTypeRules) => {
    // 改变数据类型校验规则
    this.setState({
      dataTypeRules
    });
  }

  render() {
    const { getFieldDecorator, validateFields } = this.props.form;
    const {
      dataTypeRules,
      isRequired,
      isPrefix,
      isLogicalControl,
      dateFormat,
      defaultVal,
    } = this.state;
    const {
      config,
      controlID,
      onHandleConfirm,
      onHandleCancel,
      editorState,
      onEditorStateChange,
    } = this.props;

    const ControlID = (
      // 控件ID
      <FormItem label="控件ID">
        {
          getFieldDecorator('controlID')(<Input autoComplete="off" disabled size="default" />)
        }
      </FormItem>
    );

    const ControlName = (
      // 控件名称
      <FormItem label="控件名称">
        {
          getFieldDecorator('controlName', {
            rules: [
              { required: isRequired, message: '请填写控件名称' }
            ]
          })(<Input autoComplete="off" size="default" placeholder="请填写控件名称" />)
        }
      </FormItem>
    );

    const Tags = (
      // 控件标签
      <FormItem label="标签">
        {
          getFieldDecorator('tags', { valuePropName: 'defaultValue' })(
            <Select
              allowClear
              size="default"
              mode="tags"
              tokenSeparators={[',']}
              placeholder="多个标签可用逗号分割"
            />
          )
        }
      </FormItem>
    );

    const DescribeVal = (
      // 控件描述
      <FormItem label="控件描述">
        {getFieldDecorator('describeVal')(
          <Input autoComplete="off" size="default" placeholder="请输入控件描述信息" />
        )}
      </FormItem>
    );

    const EntityColor = (
      // 实体颜色
      <FormItem label="字体颜色">
        {
          getFieldDecorator('entityColor', { valuePropName: 'entityColor' })(
            <ColorPicker config={config} />
          )
        }
      </FormItem>
    );

    let DefaultVal;
    // 控件值
    if (controlID === 'TextInput') {
      DefaultVal = (
        <FormItem label="控件值" className={styles.defaultVal}>
          {
            getFieldDecorator('defaultVal', {
              rules: [
                { required: isRequired, message: '请填写控件值' },
                ...dataTypeRules,
              ]
            })(
              <Input autoComplete="off" size="default" placeholder="请输入控件值" onChange={this.onDefaultValChange} />
            )
          }
        </FormItem>
      );
    }
    if (controlID === 'SelectionInput' || controlID === 'SelectionMultipleInput') {
      DefaultVal = (
        <FormItem label="控件值" className={styles.defaultVal}>
          {
            getFieldDecorator('defaultVal')(
              <Input
                disabled
                size="default"
                addonAfter={
                  <Button title="清除默认值" size="default" icon="rollback" onClick={this.onCleanDefaultVal} />
                }
              />
            )
          }
        </FormItem>
      );
    }
    if (controlID === 'DateInput') {
      DefaultVal = (
        <FormItem label="控件值">
          {
            getFieldDecorator('defaultVal', {
              rules: [{ required: isRequired, message: '请选择日期时间' }]
            })(
              <DatePicker
                showTime
                size="default"
                style={{ width: '100%' }}
                placeholder="请选择时间"
                format={dateFormat}
                onChange={this.onDefaultValChange}
              />
            )
          }
        </FormItem>
      );
    }

    const IsRequired = (
      <FormItem
        label="必填"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
      >
        {
          getFieldDecorator('isRequired', { valuePropName: 'defaultChecked' })(
            <Switch
              size="default"
              checkedChildren="是"
              unCheckedChildren="否"
              onChange={this.onSwitchChange}
            />
          )
        }
      </FormItem>
    );

    const IsReadOnly = (
      <FormItem
        label="只读"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
      >
        {
          getFieldDecorator('isReadOnly', { valuePropName: 'defaultChecked' })(
            <Switch
              size="default"
              checkedChildren="是"
              unCheckedChildren="否"
            />
          )
        }
      </FormItem>
    );

    const IsPrefix = (
      <FormItem
        label="前后缀"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
      >
        {
          getFieldDecorator('isPrefix', { valuePropName: 'checked' })(
            <Switch
              size="default"
              checkedChildren="是"
              unCheckedChildren="否"
              onChange={this.onIsPrefixChange}
            />
          )
        }
      </FormItem>
    );

    const IsLogicalControl = (
      <FormItem
        label="逻辑质控"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
      >
        {
          getFieldDecorator('isLogicalControl', { valuePropName: 'defaultChecked' })(
            <Switch
              size="default"
              checkedChildren="是"
              unCheckedChildren="否"
              onChange={this.onIsLogicalChange}
            />
          )
        }
      </FormItem>
    );

    const PrefixSuffixs = (
      <FormItem>
        {
          getFieldDecorator('prefixSuffix', { valuePropName: 'prefixSuffix' })(
            <PrefixSuffix />
          )
        }
      </FormItem>
    );

    const DataType = (
      <FormItem label="数据类型">
        {
          getFieldDecorator('dataType', { valuePropName: 'dataType' })(
            <SelectType
              isRequired={isRequired}
              getRules={this.getRules}
            />
          )
        }
      </FormItem>
    );

    const PullDownOptionGroups = (
      // 下拉多选菜单
      <FormItem>
        {
          getFieldDecorator('pullDownOptionGroup', { valuePropName: 'pullDownOptionGroup' })(
            <PullDownOptionGroup
              controlID={controlID}
              defaultVal={defaultVal}
              onSetDefaultVal={this.onSetDefaultVal}
              onAddDefaultVal={this.onAddDefaultVal}
              onCleanDefaultVal={this.onCleanDefaultVal}
            />
          )
        }
        )
      </FormItem>
    );

    const SelectTodos = (
      <FormItem>
        <Tabs type="card">
          <TabPane tab="自定义选项" key="1">
            {
              getFieldDecorator('selectTodos', { valuePropName: 'selectTodos' })(
                <SelectTodo
                  controlID={controlID}
                  onSetDefaultVal={this.onSetDefaultVal}
                  onAddDefaultVal={this.onAddDefaultVal}
                  onCleanDefaultVal={this.onCleanDefaultVal}
                />
              )
            }
          </TabPane>
        </Tabs>
      </FormItem>
    );

    const DateFormat = (
      <FormItem label="日期格式">
        {
          getFieldDecorator('dateFormat', {
            valuePropName: 'defaultValue',
          })(
            <Select
              showSearch
              mode="combobox"
              size="default"
              placeholder="选择日期格式"
              notFoundContent="自定义格式"
              optionFilterprop="children"
              onChange={this.onDateFormatChange}
            >
              <Option key="1" value="YYYY-MM-DD">YYYY-MM-DD</Option>
              <Option key="2" value="HH:MM">HH:mm</Option>
              <Option key="3" value="YYYY-MM-DD HH:MM">YYYY-MM-DD HH:mm</Option>
              <Option key="4" value="YYYY-MM-DD HH:MM:SS">YYYY-MM-DD HH:mm:ss</Option>
              <Option key="5" value="YYYY/MM/DD">YYYY/MM/DD</Option>
              <Option key="6" value="YYYY/MM/DD HH:MM">YYYY/MM/DD HH:mm</Option>
              <Option key="7" value="YYYY/MM/DD HH:MM:SS">YYYY/MM/DD HH:mm:ss</Option>
              <Option key="8" value="YYYY年MM月DD日 HH:mm:ss">年月日 HH:mm:ss</Option>
            </Select>
          )
        }
      </FormItem>
    );

    const LogicalControls = (
      <FormItem
        label="逻辑质控"
        className={classnames({
          [`${styles.logicalHide}`]: !isLogicalControl
        })}
      >
        {
          getFieldDecorator('logicalControl', { valuePropName: 'logicalControl' })(
            <LogicalControl
              controlID={controlID}
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
            />
          )
        }
      </FormItem>
    );

    // 文本输入框
    const TextInput = (
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={10}>
            <Col span={12}> {ControlID} </Col>
            <Col span={12}> {ControlName} </Col>
            <Col span={12}> {Tags} </Col>
            <Col span={12}> {DescribeVal} </Col>
            <Col span={12}> {DataType} </Col>
            <Col span={12}> {DefaultVal} </Col>
            <Col span={12}> {EntityColor} </Col>
          </Row>
          <Row gutter={10}>
            <Col span={8}> {IsRequired} </Col>
            <Col span={8}> {IsReadOnly} </Col>
            <Col span={8}> {IsLogicalControl} </Col>
          </Row>
          <Col span={24}>
            {LogicalControls}
          </Col>
        </Col>
      </Row>
    );

    // 下拉单选输入框
    const SelectionInput = (
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={10}>
            <Col span={12}> {ControlID} </Col>
            <Col span={12}> {ControlName} </Col>
            <Col span={12}> {Tags} </Col>
            <Col span={12}> {DescribeVal} </Col>
            <Col span={12}> {EntityColor} </Col>
            <Col span={12}> {DefaultVal} </Col>
            <Col span={24}> {PullDownOptionGroups} </Col>
          </Row>
          <Row gutter={10}>
            <Col span={8}> {IsRequired} </Col>
            <Col span={8}> {IsReadOnly} </Col>
            <Col span={8}> {IsLogicalControl} </Col>
          </Row>
          <Col span={24}>
            {LogicalControls}
          </Col>
        </Col>
      </Row>
    );

    // 下拉多选输入框
    const SelectionMultipleInput = (
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={10}>
            <Col span={12}>{ControlID}</Col>
            <Col span={12}>{ControlName}</Col>
            <Col span={12}>{Tags}</Col>
            <Col span={12}>{DescribeVal}</Col>
            <Col span={12}>{EntityColor}</Col>
            <Col span={12}>{DefaultVal}</Col>
            <Col span={24}>{PullDownOptionGroups}</Col>
          </Row>
          <Row gutter={10}>
            <Col span={6}>{IsPrefix}</Col>
            <Col span={6}>{IsRequired}</Col>
            <Col span={6}>{IsReadOnly}</Col>
            <Col span={6}>{IsLogicalControl}</Col>
          </Row>
          <Col span={24}> {isPrefix && PrefixSuffixs} </Col>
          <Col span={24}>
            {LogicalControls}
          </Col>
        </Col>
      </Row>
    );

    // 日期输入框
    const DateInput = (
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={10}>
            <Col span={12}>{ControlID}</Col>
            <Col span={12}>{ControlName}</Col>
            <Col span={12}>{Tags}</Col>
            <Col span={12}>{DescribeVal}</Col>
            <Col span={12}>{DateFormat}</Col>
            <Col span={12}>{DefaultVal}</Col>
            <Col span={12}>{EntityColor}</Col>
          </Row>
          <Row gutter={10}>
            <Col span={8}> {IsRequired} </Col>
            <Col span={8}> {IsReadOnly} </Col>
            <Col span={8}> {IsLogicalControl} </Col>
          </Row>
          <Col span={24}>
            {LogicalControls}
          </Col>
        </Col>
      </Row>
    );

    // 多选输入框
    const CheckBoxInput = (
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={10}>
            <Col span={12}>{ControlID}</Col>
            <Col span={12}>{ControlName}</Col>
            <Col span={12}>{Tags}</Col>
            <Col span={12}>{DescribeVal}</Col>
            <Col span={12}>{EntityColor}</Col>
            <Col span={24}>{SelectTodos}</Col>
          </Row>
          <Row gutter={10}>
            <Col span={8}>{IsRequired}</Col>
            <Col span={8}>{IsReadOnly}</Col>
            <Col span={8}>{IsLogicalControl}</Col>
          </Row>
          <Col span={24}>
            {LogicalControls}
          </Col>
        </Col>
      </Row>
    );

    // 单选输入框
    const RadioBoxInput = (
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={10}>
            <Col span={12}>{ControlID}</Col>
            <Col span={12}>{ControlName}</Col>
            <Col span={12}>{Tags}</Col>
            <Col span={12}>{DescribeVal}</Col>
            <Col span={12}>{EntityColor}</Col>
            <Col span={24}>{SelectTodos}</Col>
          </Row>
          <Row gutter={10}>
            <Col span={8}>{IsRequired}</Col>
            <Col span={8}>{IsReadOnly}</Col>
            <Col span={8}>{IsLogicalControl}</Col>
          </Row>
          <Col span={24}>
            {LogicalControls}
          </Col>
        </Col>
      </Row>
    );

    return (
      <div className={styles.root}>
        <Form>
          {this.props.controlID === 'TextInput' && TextInput}
          {this.props.controlID === 'SelectionInput' && SelectionInput}
          {this.props.controlID === 'DateInput' && DateInput}
          {this.props.controlID === 'SelectionMultipleInput' && SelectionMultipleInput}
          {this.props.controlID === 'CheckBoxInput' && CheckBoxInput}
          {this.props.controlID === 'RadioBoxInput' && RadioBoxInput}
          <Button
            size="large"
            key="submit"
            type="primary"
            style={{ marginTop: '15px' }}
            onClick={() => validateFields({ force: true }, onHandleConfirm)}
          >
            确定
          </Button>
          <Button
            size="large"
            key="cancel"
            style={{ marginLeft: '10px' }}
            onClick={onHandleCancel}
          >
            取消
          </Button>
        </Form>
      </div>
    );
  }
}

const WrapperInputForm = Form.create({
  mapPropsToFields(props) {
    let defaultVal;
    if (
      props.controlID === 'SelectionInput' ||
      props.controlID === 'SelectionMultipleInput'
    ) {
      defaultVal = props.defaultVal || '未知';
    } else {
      defaultVal = props.defaultVal;
    }
    return {
      controlID: {
        value: props.controlID
      },
      controlName: {
        value: props.controlName
      },
      tags: {
        value: props.tags
      },
      defaultVal: {
        value: defaultVal
      },
      describeVal: {
        value: props.describeVal
      },
      score: {
        value: props.score
      },
      entityColor: {
        value: props.entityColor
      },
      dataType: {
        value: props.dataType
      },
      isRequired: {
        value: props.isRequired
      },
      isReadOnly: {
        value: props.isReadOnly
      },
      isPrefix: {
        value: props.isPrefix
      },
      isLogicalControl: {
        value: props.isLogicalControl
      },
      prefixSuffix: {
        value: props.prefixSuffix
      },
      dateFormat: {
        value: props.dateFormat
      },
      pullDownOptionGroup: {
        value: props.pullDownOptionGroup
      },
      logicalControl: {
        value: props.logicalControl
      },
      selectTodos: {
        value: props.selectTodos
      }
    };
  }
})(InputForm);

export default WrapperInputForm;
