import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Layout, Menu, Icon } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const HeaderComponent = () => (
  <Layout>
    <Header className='header'>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '52px' }}
      >
        <Menu.Item key='1'><Link to='/'>Desafio_1</Link></Menu.Item>
        <Menu.Item key='2'><Link to='/about'>About</Link></Menu.Item>
        <Menu.Item key='3'>
          <a href='https://github.com/nickbouldien' target='_blank' rel='noreferrer noopener'>
            <Icon type='github' style={{ fontSize: 24, color: '#08c', marginTop: '15px' }} />
          </a>
        </Menu.Item>
      </Menu>
    </Header>
  </Layout>
);

export default HeaderComponent;
