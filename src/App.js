import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BulgerBuilder';
import Checkout from './containers/Checkout/Checkout';

import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    //Route protection
    let router_list = (
      <Switch>
        <Route path="/burger-builder" exact component={BurgerBuilder}></Route>
        <Route path="/checkout" component={Checkout}></Route>
        <Route path="/auth" component={Auth}></Route>
        <Redirect from="/" exact to="/burger-builder"></Redirect>
        <Redirect to="/"></Redirect>
      </Switch>
    );

    if (this.props.isAuth) {
      router_list = (
        <Switch>
          <Route path="/burger-builder" exact component={BurgerBuilder}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/logout" component={Auth}></Route>
          <Redirect from="/" exact to="/burger-builder"></Redirect>
          <Redirect to="/"></Redirect>
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{router_list}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.token !== null,
  };
};

export default withRouter(connect(mapStateToProps)(App));
