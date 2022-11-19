import React from "react";
import { Redirect, Route } from "react-router-dom";

// Redirect will display the user to annew pace

const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user.role === "ADMIN") {
    return <Redirect to="/admin" />;
  }

  if (user.role === "USER") {
    return <Redirect to="/user" />;
  }
  return <Redirect to="/login" />;
};

export default PrivateRoute;
