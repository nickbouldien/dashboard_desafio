import React from 'react';

const About = () => (
  <div id="about-div">
    <h1>About this project:</h1>
    <h3>Tech used:</h3>
    <div>
      <p>- <a href="https://github.com/facebook/react">React 16</a></p>
      <p>- <a href="https://webpack.github.io/">Webpack 3</a> (too much fun to setup...)</p>
      <p>- <a href="https://react-bootstrap.github.io/">React Bootstrap</a> (quick styling)</p>
    </div>

    <p>
      Props to <a href="https://swapi.co/">swapi.co <span>(Star Wars API)</span></a> for the awesome (free!) api to mess around with.
      (I'll be sure to donate some money to their project when I get a job...)
    </p>

    <p>
      This project inspired by multiple things:  I realized I hadn't looked into React 16 and its new features yet, so wanted to play around with it some.
      Also, wanted to practice with Webpack config, and I remembered that the new <a href="http://www.starwars.com/films/star-wars-episode-viii-the-last-jedi">Star Wars movie</a> was/is coming out soon (hence the theme)
    </p>

    <iframe width="560" height="315" src="https://www.youtube.com/embed/Q0CbN8sfihY"
    frameBorder="0" allowFullScreen></iframe>

    <div>
      On the docket:

        use async/await for axios fetches
        use eslint
        use flow types
        better styling
        good way to send/use styles with portals?
        add some kind of animation(s)

    </div>


    <div>
      Resources:
      <pre><code>
        // https://reactjs.org/docs/portals.html
        // https://hackernoon.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202
        // https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
        // https://medium.com/ecmastack/what-you-need-to-know-about-react-16-a4e216522041
        // https://codepen.io/gaearon/pen/wqvxGa?editors=0010
        // https://blog.sentry.io/2017/09/28/react-16-error-boundaries
        // https://hackernoon.com/error-boundaries-in-react-16-32fb8e185a3
        // https://webpack.js.org/
        // https://www.npmjs.com/package/babel-plugin-transform-react-jsx-source
      </code></pre>
    </div>



  </div>
);


export default About;
