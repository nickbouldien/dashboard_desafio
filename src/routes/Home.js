import React from 'react';
import { Link } from 'react-router-dom';
import { Image, ListGroup, ListGroupItem } from 'react-bootstrap';

const Home = () => (
  <div id='home-div'>
    <h1 id='welcome'>Welcome</h1>

    <h3>Links to the routes:</h3>

    <ListGroup>

      <ListGroupItem><Link to='about'>about</Link></ListGroupItem>
      <ListGroupItem><Link to='dashboard'>dashboard route</Link></ListGroupItem>

      <ListGroupItem><a href='https://flow.org/en/docs/react/components/' target='_blank'>flow</a></ListGroupItem>

    </ListGroup>
  </div>
);


export default Home;
