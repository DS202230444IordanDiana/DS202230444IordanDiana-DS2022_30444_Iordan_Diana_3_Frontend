import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavigationBar from "./navigation-bar";
import Home from "./home/home";
import PersonContainer from "./admin/person-container";
import ErrorPage from "./commons/errorhandling/error-page";
import styles from "./commons/styles/project-style.css";
import Login from "./authentication/login";
import PrivateRoute from "./authentication/privateRoute";
import { UserContainer } from "./user/user-container";
import DeviceContainer from "./admin/device-container";
import { AdminHomepage } from "./admin/adminHomepage";
import { DeviceCharts } from "./user/device-charts";

function App() {
  return (
    <div className={styles.back}>
      <Router>
        <div>
          <NavigationBar />
          <Switch>
            <PrivateRoute exact path="/" />

            <Route
              exact
              path="/admin/person"
              render={() => <PersonContainer />}
            />

            <Route exact path="/charts" render={() => <DeviceCharts />} />
            <Route exact path="/user" render={() => <UserContainer />} />
            <Route exact path="/error" render={() => <ErrorPage />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/devices" render={() => <DeviceContainer />} />
            <Route path="/admin" render={() => <AdminHomepage />} />
            <Route render={() => <ErrorPage />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
