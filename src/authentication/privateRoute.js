import React from "react";
import { Redirect, Route } from "react-router-dom";

// Redirect will display the user to annew pace

const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (user.role == "admin") {
    return <Redirect to="/admin" />;
  }

  if (user.role == "user") {
    return <Redirect to="/user" />;
  }
};

export default PrivateRoute;
