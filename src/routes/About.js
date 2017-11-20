import React from 'react';

const About = () => (
  <div id='about-div'>
    <h1>About this project:</h1>
    <h3>Tech used:</h3>
    <div>
      <p>- <a href='https://github.com/facebook/react'>React 16</a></p>
      <p>- <a href='https://webpack.github.io/'>Webpack 3</a> (too much fun to setup...)</p>
      <p>- <a href='https://react-bootstrap.github.io/'>React Bootstrap</a> (quick styling)</p>




    </div>

    <div>
      API usage:
      <p>- <a href='https://iextrading.com/api-exhibit-a'>IEX Trading (api used for stocks)</a></p>
      <p>- <a href='http://fixer.io/'>fixer.io (api used for currencies)</a></p>

      For list of public apis:
      <p>- <a href='https://github.com/toddmotto/public-apis#currency-exchange'>github link</a></p>


    </div>



  </div>
);


export default About;
