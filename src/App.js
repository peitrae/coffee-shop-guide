import React, { useEffect, Fragment } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Homepage from './views/Homepage/Homepage';
import Search from './views/Search/Search';
import NavBar from './components/UI/NavBar/NavBar';
import ProfilePage from './views/ProfilePage/ProfilePage';
import CoffeeShop from './views/CoffeeShop/CoffeeShop';
import UpdateCoffeeShop from './views/UpdateCoffeeShop/UpdateCoffeeShop';
import Spinner from './components/UI/Spinner/Spinner';
import * as actions from './store/actions/member';

const App = () => {
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.member.token !== null);

  useEffect(() => {
    dispatch(actions.authCheckState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authenticatedRoute = () => {
    if (token) {
      return (
        <Fragment>
          <Route path="/search" exact component={Search} />
          <Route path="/coffee-shop/:id" exact component={CoffeeShop} />
          <Route path="/update-coffee-shop" exact component={UpdateCoffeeShop} />
          <Route path="/update-coffee-shop/:id" exact component={UpdateCoffeeShop} />
          <Route path="/profile" exact component={ProfilePage} />
        </Fragment>
      );
    } else return null;
  };

  if(token && !isAuthenticated) {
    return <Spinner />
  } else return (
    <Fragment>
      <NavBar/>
      <Switch>
        <Route path="/" exact component={Homepage} />
        {authenticatedRoute()}
        <Redirect to="/" />
      </Switch>
    </Fragment>
  );
};

export default withRouter(App);
