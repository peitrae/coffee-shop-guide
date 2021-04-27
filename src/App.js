import React, { useEffect, Fragment } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Homepage from "./views/Homepage";
import Search from "./views/Search";
import ProfilePage from "./views/ProfilePage";
import CoffeeShop from "./views/CoffeeShop";
import AddCoffeeShop from "./views/AddCoffeeShop";
import UpdateCoffeeShop from "./views/UpdateCoffeeShop";
import Spinner from "./components/UI/Spinner";
import * as actions from "./store/actions/member";

const App = () => {
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.member.token !== null);

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
          <Route path="/add-coffeeshop" exact component={AddCoffeeShop} />
          <Route path="/update-coffeeshop/:id" exact component={UpdateCoffeeShop} />
          <Route path="/profile" exact component={ProfilePage} />
        </Fragment>
      );
    } else return null;
  };

  if (token && !isAuthenticated) {
    return <Spinner />;
  } else
    return (
      <Fragment>
        <Switch>
          <Route path="/" exact component={Homepage} />
          {authenticatedRoute()}
          <Redirect to="/" />
        </Switch>
      </Fragment>
    );
};

export default withRouter(App);
