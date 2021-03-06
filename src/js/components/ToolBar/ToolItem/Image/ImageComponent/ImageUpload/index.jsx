import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs
} from 'antd';

import WrapperLinkImage from './LinkImage';
import WrapperLocalImage from './LocalImage';

const TabPane = Tabs.TabPane;

export default class ImageUpload extends React.Component {
  static propTypes = {
    onHandleConfirm: PropTypes.func.isRequired,
    onHandleCancel: PropTypes.func.isRequired
  };

  render() {
    const { onHandleConfirm, onHandleCancel } = this.props;

    return (
      <div>
        <Tabs>
          <TabPane tab="本地上传" key="1">
            <WrapperLocalImage
              onHandleConfirm={onHandleConfirm}
              onHandleCancel={onHandleCancel}
            />
          </TabPane>
          <TabPane tab="图片链接" key="2">
            <WrapperLinkImage
              onHandleConfirm={onHandleConfirm}
              onHandleCancel={onHandleCancel}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
