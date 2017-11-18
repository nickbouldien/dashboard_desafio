import React from 'react';
import { Link } from 'react-router-dom';
import { Image, ListGroup, ListGroupItem } from 'react-bootstrap';

const Home = () => (
  <div id='home-div'>
    <h1 id='welcome'>Welcome</h1>

    <h3>Links to the routes:</h3>

    <ListGroup>
      {/* <ListGroupItem><Link to="portal">portal</Link></ListGroupItem>
      <ListGroupItem><Link to="return-array">return array</Link></ListGroupItem>
      <ListGroupItem><Link to="error-boundary">error boundary</Link></ListGroupItem>
      <ListGroupItem><Link to="custom-attributes">custom attributes</Link></ListGroupItem> */}
      <ListGroupItem><Link to='about'>about</Link></ListGroupItem>
      <ListGroupItem><Link to='test'>test route</Link></ListGroupItem>
    </ListGroup>
  </div>
);


export default Home;
