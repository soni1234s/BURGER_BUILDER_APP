import React, { Component } from 'react';
import Checkout from './containers/CheckOut/checkout';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/MyOrders/myorders';
import Auth from './containers/Auth/Auth';

class App extends Component {

  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/auth" component={Auth} />
            <Route path="/" component={BurgerBuilder}/> 
          </Switch>  
        </Layout>
      </div>
    );
  }
}

export default App;