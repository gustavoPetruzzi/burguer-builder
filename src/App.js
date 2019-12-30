import React, {useEffect} from 'react';
import Layout from './hoc/Layout/Layout';
import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';
import {Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux'
import * as actions from './store/actions/index';
function App(props) {
  
  useEffect(() => {
    console.log(props);
    console.log("ENTRANDO");
    props.onTryAutoSignUp();
  }, [])
  let routes = (
    <Switch>
      <Route path="/auth" component={Auth}  />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch> 
  )

  if(props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} /> 
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
