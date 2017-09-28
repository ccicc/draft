/* eslint-disable */

import React from 'react';
import { Menu, Dropdown, Button } from 'antd';

export default class ListTypeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  onHandleClick = (e) => {
    const { listType, onChange } = this.props;
    const { key } = e;
    onChange(listType.type, key);
  }

  render() {
    const {listType} = this.props;
    const dropMenu = (
      <Menu onClick={this.onHandleClick}>
        {
          listType.styles.map(item => (
            <Menu.Item
              key={item.type}
            >
              {item.text}
            </Menu.Item>
          ))
        }
      </Menu>
    );

    return (
      <Dropdown.Button
        size="small"
        placement="bottomCenter"
        title={listType.title}
        overlay={dropMenu}
        onClick={this.onHandleClick}
      >
        <i className={`fa fa-${listType.icon} fa-lg`}></i>
      </Dropdown.Button>
    )
  }
}
