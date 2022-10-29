import Button from "@mui/material/Button";
import React from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { BsArrowRightCircle } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";
import "../commons/styles/form-styles.css";
import { IoCaretBackCircleSharp } from "react-icons/io";

const Register = ({ homepageButton }) => {
  return (
    <div>
      <form id="registerForm" className="formClass">
        <div className="formDivClass">
          <div className="formTitle">
            <text>Registration Form</text>
            <AppRegistrationIcon
              sx={{ fontSize: 40 }}
              style={{ marginLeft: "10px" }}
            />
          </div>

          <label forHtml="registrationFname" className="formLabel">
            First name
          </label>
          <input type="text" id="registrationFname" />

          <label forHtml="registrationLname" className="formLabel">
            Last name
          </label>
          <input type="text" id="registrationLname" />

          <label forHtml="registrationBday" className="formLabel">
            Date of birth
          </label>
          <input type="date" id="registrationBday" />

          <label forHtml="registrationUsername" className="formLabel">
            Username
          </label>
          <input type="text" id="registrationUsername" />

          <label forHtml="registrationPassword" className="formLabel">
            Password
          </label>
          <input type="password" id="registrationPassword" />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              className="formButton"
              variant="contained"
              endIcon={<AiOutlineClear />}
            >
              Clear form
            </Button>
            <Button
              className="formButton"
              variant="contained"
              endIcon={<BsArrowRightCircle />}
              type="submit"
            >
              Register
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
