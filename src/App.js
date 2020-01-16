import React, {useEffect} from 'react';
import Layout from './hoc/Layout/Layout';
import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';


import {Switch, Route, withRouter, Redirect } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux'
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() =>{
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() =>{
  return import('./containers/Checkout/Orders/Orders');
});

const asyncAuth = asyncComponent(() =>{
  return import('./containers/Auth/Auth');
});

function App(props) {
  
  useEffect(() => {
    props.onTryAutoSignUp();
  }, [])
  let routes = (
    <Switch>
      <Route path="/auth" component={asyncAuth}  />
      <Route path="/" exact component={BurgerBuilder} />
      
    </Switch> 
  )

  if(props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/auth" component={asyncAuth}  />
        <Route path="/orders" component={asyncOrders} /> 
        <Route path="/logout" component={Logout} />      
        <Route path="/" exact component={BurgerBuilder} />
        
      </Switch>
    )
  }
  return (   
    <Layout>
      {routes}
    </Layout>
  );
}
const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
