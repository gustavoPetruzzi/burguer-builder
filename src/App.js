import React from 'react';
import Layout from './hoc/Layout/Layout';
import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux'
function App() {
  return (
    
      <BrowserRouter>
        <Layout>
          <Switch >
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} /> 
            <Route path="/auth" component={Auth}  />
            <Route path="/logout" component={Logout} />
          </Switch>
        </Layout>
      </BrowserRouter>
    
  );
}

export default connect()(App);
