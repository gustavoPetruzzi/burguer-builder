import React from 'react';
import Layout from './hoc/Layout/Layout';
import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Checkout/Orders/Orders';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
function App() {
  return (
    
      <BrowserRouter>
        <Layout>
          <Switch >
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} /> 
          </Switch>
        </Layout>
      </BrowserRouter>
    
  );
}

export default App;
