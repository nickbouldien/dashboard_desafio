import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

import About from './components/About';
import DashboardContainer from './containers/DashboardContainer';
import Header from './components/Header';

import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './styles.css';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={DashboardContainer} />
            <Route exact path='/about' component={About} />
            <Redirect to='/' />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
// if (module.hot) {
//    module.hot.accept('./print.js', function() {
//      console.log('Accepting the updated printMe module!');
//      printMe();
//    });
//  }
