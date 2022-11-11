import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavigationBar from "./navigation-bar";
import Home from "./home/home";
import PersonContainer from "./admin/person-container";
import ErrorPage from "./commons/errorhandling/error-page";
import styles from "./commons/styles/project-style.css";
import Login from "./authentication/login";
// import DeviceContainer from "./admin/device-container";
import PrivateRoute from "./authentication/privateRoute";

function App() {
  return (
    <div className={styles.back}>
      <Router>
        <div>
          <NavigationBar />
          <Switch>
            <PrivateRoute exact path="/" />

            <Route exact path="/person" render={() => <PersonContainer />} />

            <Route exact path="/error" render={() => <ErrorPage />} />
            <Route path="/login" render={() => <Login />} />

            {/* <Route exact path="/devices" render={() => <DeviceContainer />} /> */}

            <Route render={() => <ErrorPage />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
