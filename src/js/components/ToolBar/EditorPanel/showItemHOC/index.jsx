import React from 'react';
import { Col } from 'antd';

const showItemHOC = (options) =>
  (WrapperComponent) =>
    class extends WrapperComponent {
      static displayName = `HOC-${getDisplayName(WrapperComponent)}`;
      render() {
        if (this.props.isShow) {
          return (
            <Col span={options.span}>
              {super.render()}
            </Col>
          );
        }
        return null;
      }
    };

function getDisplayName(WrapperComponent) {
  return WrapperComponent.displayName ||
    WrapperComponent.name ||
    'Component';
}

export default showItemHOC;
