import React from 'react';
import { List } from 'antd';

const techData = [
  <a href='https://github.com/facebook/react' target='_blank' rel='noopener noreferrer' >React 16</a>,
  <a href='https://webpack.github.io/' target='_blank' rel='noopener noreferrer' >Webpack 3</a>,
  <a href='https://ant.design/' target='_blank' rel='noopener noreferrer' >Ant Design</a>,
  <a href='https://redux.js.org/' target='_blank' rel='noopener noreferrer' >Redux</a>,
  <a href='https://github.com/gaearon/redux-thunk' target='_blank' rel='noopener noreferrer' >Redux-thunk</a>,
  <a href='https://github.com/react-dnd/react-dnd' target='_blank' rel='noopener noreferrer' >React-DnD</a>
];

const apiData = [
  <a href='https://iextrading.com/developer/'>IEX Trading (api used for stocks)</a>,
  <a href='http://fixer.io/'>fixer.io (api used for currencies)</a>,
  <a href='https://github.com/toddmotto/public-apis#currency-exchange'>github link</a>
];

const todoData = [
  "Implement 'Delete card' functionality ",
  "Fix card index (location in array) bug",
  "Have search/filter feature to show only cards with that data in title/body/etc.",
  "More error displaying",
  "Let user pick which lane to put new card in",
  "Loading / spinner"
];


const About = () => (
  <div id='about-div'>
    <h1>About this project:</h1>

    <h3 style={{ margin: '16px 0' }}>Tech Used:</h3>

    <List
      size={"large"}
      bordered
      dataSource={techData}
      renderItem={item => (<List.Item>{item}</List.Item>)}
    />

    <h3 style={{ margin: '16px 0' }}>API usage:</h3>

    <List
      size={"large"}
      bordered
      dataSource={apiData}
      renderItem={item => (<List.Item>{item}</List.Item>)}
    />

    <h3 style={{ margin: '16px 0' }}>Todo:</h3>

    <List
      size={"large"}
      bordered
      dataSource={todoData}
      renderItem={item => (<List.Item>{item}</List.Item>)}
    />

  </div>
);

export default About;