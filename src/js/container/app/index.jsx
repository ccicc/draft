import React from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {
  Layout,
  Row,
  Col,
  Affix
} from 'antd';
import { Draft, SideBar } from './../../components';
import styles from './index.less';

moment.locale('zh-cn');
const { Header, Content, Sider } = Layout;

const App = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <Row gutter={10}>
          <Col span={6}>
            <a href="##" className={styles.logo}>
              <img className={styles.img} src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" alt="oakLogo" />
              <span className={styles.title}>医护一体化急症信息平台</span>
            </a>
          </Col>
        </Row>
      </Header>

      <Layout className={styles.main}>
        <Sider className={styles.sidebar}>
          <Affix offsetTop={60}>
            <SideBar />
          </Affix>
        </Sider>
        <Layout>
          <Content>
            <p className={styles.toolbar}>工具条</p>
            <Draft />
          </Content>
        </Layout>

      </Layout>
    </Layout>
  );
};

export default App;
