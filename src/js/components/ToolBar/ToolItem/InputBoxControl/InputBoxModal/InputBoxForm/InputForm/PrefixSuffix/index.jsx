/* eslint-disable */
import React from 'react';
import {
  Input,
  Row,
  Col
} from 'antd';

export default class PrefixSuffix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prefixSuffix: {
        activePrefix: '有',
        prefix: '无',
        activeSuffix: '',
        suffix: '',
        connector: '、',
        separator: '，'
      }
    };
  }

  componentWillMount() {
    this.props.prefixSuffix !== undefined &&
    this.setState({
      prefixSuffix: {
        activePrefix: this.props.prefixSuffix.activePrefix,
        prefix: this.props.prefixSuffix.prefix,
        activeSuffix: this.props.prefixSuffix.activeSuffix,
        suffix: this.props.prefixSuffix.suffix,
        connector: this.props.prefixSuffix.connector,
        separator: this.props.prefixSuffix.separator
      }
    })
  }

  onActivePrefix = (e) => {
    const { value } = e.target;
    this.setState(
      {
        prefixSuffix: {
          ...this.state.prefixSuffix,
          activePrefix: value
        }
      }
    );
    setTimeout(() => this.props.onChange(this.state.prefixSuffix), 0);
  }

  onPrefix = (e) => {
    const { value } = e.target;
    this.setState(
      {
        prefixSuffix: {
          ...this.state.prefixSuffix,
          prefix: value
        }
      }
    );
    setTimeout(() => this.props.onChange(this.state.prefixSuffix), 0);
  }

  onActiveSuffix = (e) => {
    const { value } = e.target;
    this.setState(
      {
        prefixSuffix: {
          ...this.state.prefixSuffix,
          activeSuffix: value
        }
      }
    );
    setTimeout(() => this.props.onChange(this.state.prefixSuffix), 0);
  }

  onSuffix = (e) => {
    const { value } = e.target;
    this.setState(
      {
        prefixSuffix: {
          ...this.state.prefixSuffix,
          suffix: value
        }
      }
    );
    setTimeout(() => this.props.onChange(this.state.prefixSuffix), 0);
  }

  onConnector = (e) => {
    const { value } = e.target;
    this.setState(
      {
        prefixSuffix: {
          ...this.state.prefixSuffix,
          connector: value
        }
      }
    );
    setTimeout(() => this.props.onChange(this.state.prefixSuffix), 0);
  }

  onSeparator = (e) => {
    const { value } = e.target;
    this.setState(
      {
        prefixSuffix: {
          ...this.state.prefixSuffix,
          separator: value
        }
      }
    );
    setTimeout(() => this.props.onChange(this.state.prefixSuffix), 0);
  }

  render() {
    const {
      activePrefix,
      activeSuffix,
      prefix,
      suffix,
      connector,
      separator
    } = this.state.prefixSuffix;

    return (
      <Row gutter={10}>
        <Col span={7}>
          <Input
            size="default"
            value={activePrefix}
            addonBefore="选中时前缀"
            onChange={this.onActivePrefix}
          />
        </Col>
        <Col span={7}>
          <Input
            size="default"
            value={prefix}
            addonBefore="未选中前缀"
            onChange={this.onPrefix}
          />
        </Col>
        <Col span={5}>
          <Input
            size="default"
            value={connector}
            addonBefore="连接符"
            onChange={this.onConnector}
          />
        </Col>
        <Col span={5}>
          <Input
            size="default"
            value={separator}
            addonBefore="分割符"
            onChange={this.onSeparator}
          />
        </Col>
        <Col span={7}>
          <Input
            size="default"
            value={activeSuffix}
            addonBefore="选中时后缀"
            onChange={this.onActiveSuffix}
          />
        </Col>
        <Col span={7}>
          <Input
            size="default"
            value={suffix}
            addonBefore="未选中后缀"
            onChange={this.onSuffix}
          />
        </Col>
      </Row>
    )
  }
}
