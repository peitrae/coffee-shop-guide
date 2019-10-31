import React from "react";
import { Route, Switch } from "react-router";

import Homepage from "./views/Homepage/Homepage";
import Search from "./views/Search/Search";
import NavBar from "./components/UI/NavBar/NavBar";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import VerificationOwner from "./views/VerificationOwner/VerificationOwner";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route path="/search" exact component={Search} />
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/" exact component={ProfilePage} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
