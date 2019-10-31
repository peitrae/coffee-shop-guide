import React, { useEffect } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router";
import { connect } from "react-redux";

import Homepage from "./views/Homepage/Homepage";
import Search from "./views/Search/Search";
import NavBar from "./components/UI/NavBar/NavBar";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import VerificationOwner from "./views/VerificationOwner/VerificationOwner";
import CoffeeShop from "./views/CoffeeShop/CoffeeShop";
import UpdateCoffeeShop from "./views/UpdateCoffeeShop/UpdateCoffeeShop";
import * as actions from "./store/actions/member";

const App = props => {
  const { authCheckState, hasPreference } = props;

  useEffect(() => {
    authCheckState(hasPreference);
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/search" exact component={Search} />
        <Route path="/coffee-shop/:id" exact component={CoffeeShop} />
        <Route path="/update-coffee-shop" exact component={UpdateCoffeeShop} />
        <Route
          path="/update-coffee-shop/:id"
          exact
          component={UpdateCoffeeShop}
        />
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/verificationOwner" exact component={VerificationOwner} />
        <Redirect to="/" />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.member.token !== null,
    hasPreference: state.member.preference
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authCheckState: preference => dispatch(actions.authCheckState(preference))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
