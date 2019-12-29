import React, {useEffect} from 'react';
import Layout from './hoc/Layout/Layout';
import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';
import {Switch, Route, withRouter } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux'
import * as actions from './store/actions/index';
function App(props) {
  
  useEffect(() => {
    console.log(props);
    console.log("ENTRANDO");
    props.onTryAutoSignUp();
  }, [])
  return (
    
      
        <Layout>
          <Switch >
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} /> 
            <Route path="/auth" component={Auth}  />
            <Route path="/logout" component={Logout} />
          </Switch>
        </Layout>
      
    
  );
}

const mapDispatchToProps = dispatch =>{
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null,mapDispatchToProps)(App));
