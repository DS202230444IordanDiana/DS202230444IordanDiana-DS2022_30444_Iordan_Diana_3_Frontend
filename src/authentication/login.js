import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import "../commons/styles/form-styles.css";
import Button from "@mui/material/Button";
import { Jumbotron } from "reactstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as API_USERS from "../admin/api/person-api";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();
  const history = useHistory();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  if (loggedInUser) {
    return (
      <div>
        You are already logged in with an account. Please log out first.{" "}
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    API_USERS.getPersonByUsername(username, setUser);
    if (user) {
      if (("USER:", user.password === password)) {
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Logged in");
        history.push("/");
      }
    } else {
      console.log("Incorrect password");
    }
  };

  return (
    <Jumbotron fluid className="jumbotron">
      <form id="loginForm" className="formClass" onSubmit={handleSubmit}>
        <div className="formDivClass">
          <div className="formTitle">
            <text className="loginLabel"> Login </text>
          </div>

          <label forHtml="loginUsername" className="formLabel">
            Username
          </label>
          <input
            type="text"
            id="loginUsername"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <label forHtml="loginPassword" className="formLabel">
            Password
          </label>
          <input
            type="password"
            id="loginPassword"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            className="formButton"
            variant="contained"
            startIcon={<AiOutlineLogin />}
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>
    </Jumbotron>
  );
};

export default Login;
