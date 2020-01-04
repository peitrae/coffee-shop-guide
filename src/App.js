import React, { useEffect, useCallback } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import Homepage from "./views/Homepage/Homepage";
import Search from "./views/Search/Search";
import NavBar from "./components/UI/NavBar/NavBar";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import CoffeeShop from "./views/CoffeeShop/CoffeeShop";
import UpdateCoffeeShop from "./views/UpdateCoffeeShop/UpdateCoffeeShop";
import * as actions from "./store/actions/member";
import Footer from "./components/UI/Footer/Footer";

const App = () => {
  const hasPreference = useSelector(state => state.member.preference);

  const dispatch = useDispatch();
  const authCheckState = useCallback(
    preference => dispatch(actions.authCheckState(preference)),
    [dispatch]
  );

  useEffect(() => {
    authCheckState(hasPreference);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <NavBar />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/search" exact component={Search} />
          <Route path="/coffee-shop/:id" exact component={CoffeeShop} />
          <Route path="/update-coffee-shop" exact component={UpdateCoffeeShop} />
          <Route path="/update-coffee-shop/:id" exact component={UpdateCoffeeShop} />
          <Route path="/profile" exact component={ProfilePage} />
          <Redirect to="/" />
        </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(App);
