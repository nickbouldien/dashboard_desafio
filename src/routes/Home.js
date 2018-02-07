import React from 'react';
import { Link } from 'react-router-dom';
import { Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import { List, Avatar } from 'antd';

const linksToRender = () => [
  // <Link to='about'>about</Link>, 
  // <Link to='dashboard'>dashboard route</Link>,
  // <a href='https://flow.org/en/docs/react/components/' target='_blank'>flow</a>
  'NICK',
  'jake',
  'nathan'
];

const Home = () => (
  <div id='home-div'>
    <h1 id='welcome'>Welcome</h1>

    <h3>Links to the routes:</h3>
    <ListGroup>

      <ListGroupItem><Link to='about'>about</Link></ListGroupItem>
      <ListGroupItem><Link to='dashboard'>dashboard route</Link></ListGroupItem>

      <ListGroupItem><a href='https://flow.org/en/docs/react/components/' target='_blank'>flow</a></ListGroupItem>

    </ListGroup>

    {/* <List
      size='large'
      header={<div>Links to the routes:</div>}
      // footer={<div>Footer</div>}
      // dataSource={linksToRender}
      // renderItem={link => (<List.Item>{link}</List.Item>)}
      renderItem={[   'NICK',
                    'jake',
                    'nathan'
                ]
      }
    /> */}

    {/* <List
      itemLayout='horizontal'
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
            title={<a href='https://ant.design'>{item.title}</a>}
            description='Ant Design, a design language for background applications, is refined by Ant UED Team'
          />
        </List.Item>
      )}
    /> */}
    
  </div>
);


export default Home;
