import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import "../commons/styles/form-styles.css";
import Button from "@mui/material/Button";
import { Jumbotron } from "reactstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { username: username, password: password, role: "user" };
    //TODO: USE API TO
    localStorage.setItem("user", JSON.stringify(user));
    history.push("/");
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
