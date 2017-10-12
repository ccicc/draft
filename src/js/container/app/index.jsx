import React from 'react';
import { Layout } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Draft } from './../../components';
import './index.less';

moment.locale('zh-cn');
const { Header, Content } = Layout;

const App = () => {
  return (
    <Layout className="layout">
      <Header className="header">
        header
      </Header>
      <Content className="content">
        <Draft />
      </Content>
    </Layout>
  );
};

export default App;
