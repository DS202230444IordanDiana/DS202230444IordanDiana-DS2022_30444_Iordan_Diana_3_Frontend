import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import "../commons/styles/form-styles.css";
import Button from "@mui/material/Button";

const Login = () => {
  return (
    <div>
      <form id="loginForm" className="formClass">
        <div className="formDivClass">
          <div className="formTitle">
            <text className="loginLabel"> Login </text>
          </div>

          <label forHtml="loginUsername" className="formLabel">
            Username
          </label>
          <input type="text" id="loginUsername" />

          <label forHtml="loginPassword" className="formLabel">
            Password
          </label>
          <input type="password" id="loginPassword" />

          <Button
            className="formButton"
            variant="contained"
            startIcon={<AiOutlineLogin />}
            type="submit"
          >
            Login
          </Button>

          <div className="bottomMessage">
            Don't have an account? Click <a href="/register">here</a> to
            register now!
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
