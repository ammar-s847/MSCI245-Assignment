import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import history from './history';
import Landing from '../Landing';
import MyPage from '../MyPage';
import Search from '../Search';

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/search" exact component={Search} />
      <Route path="/reviews" exact component={Home} />
      <Route path="/mypage" exact component={MyPage} />
      </Switch>
    </Router>
  );
}