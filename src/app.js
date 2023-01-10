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
import { NotificationPage } from "./user/notifications/notifications-container";
import { MainChat } from "./chat/main-chat";

function App() {
  return (
    <div className={styles.back}>
      <Router>
        <div>
          <Switch>
            <PrivateRoute exact path="/" />
            <Route
              path="/user/notifications"
              render={() => <NotificationPage />}
            />
            <Route
              exact
              path="/admin/person"
              render={() => <PersonContainer />}
            />
            <Route exact path="/user" render={() => <UserContainer />} />
            <Route exact path="/chat" render={() => <MainChat />} />
            <Route exact path="/error" render={() => <ErrorPage />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/devices" render={() => <DeviceContainer />} />
            <Route render={() => <ErrorPage />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
