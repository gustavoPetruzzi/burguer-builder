import React from 'react';
import Layout from './hoc/Layout/Layout';
import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Switch >
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
