import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { FormGroup, Input, Label } from "reactstrap";
import Button from "react-bootstrap/Button";

import Validate from "./validators/person-validators";
import * as API_USERS from "../api/person-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";

const formControlsInit = (user) => {
  return {
    username: {
      value: user ? user.username : "",
      placeholder: "Username...",
      valid: false,
      touched: false,
      validationRules: {
        emailValidator: true,
      },
    },
    password: {
      value: user ? user.password : "",
      placeholder: "Password...",
      valid: false,
      touched: false,
      validationRules: {
        minLength: 8,
      },
    },
    name: {
      value: user ? user.name : "",
      placeholder: "What is your name?...",
      valid: false,
      touched: false,
      validationRules: {
        minLength: 3,
        isRequired: true,
      },
    },
    age: {
      value: user ? user.age : "",
      placeholder: "Age...",
      valid: false,
      touched: false,
    },
    address: {
      value: user ? user.address : "",
      placeholder: "Cluj, Zorilor, Str. Lalelelor 21...",
      valid: false,
      touched: false,
    },
  };
};

function PersonForm(props) {
  const [error, setError] = useState({ status: 0, errorMessage: null });
  const [formIsValid, setFormIsValid] = useState(false);
  const [formControls, setFormControls] = useState(
    formControlsInit(props.user)
  );
  const [isEdited, setEdited] = useState(props.isEdited);

  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;

    let updatedControls = { ...formControls };

    let updatedFormElement = updatedControls[name];

    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = Validate(
      value,
      updatedFormElement.validationRules
    );
    updatedControls[name] = updatedFormElement;

    let formIsValid = true;
    for (let updatedFormElementName in updatedControls) {
      formIsValid =
        updatedControls[updatedFormElementName].valid && formIsValid;
    }

    setFormControls((formControls) => updatedControls);
    setFormIsValid((formIsValidPrev) => formIsValid);
  }

  function registerPerson(person) {
    return API_USERS.postPerson(person, (result, status, err) => {
      if (result !== null && (status === 200 || status === 201)) {
        console.log("Successfully inserted person with id: " + result);
        props.reloadHandler();
      } else {
        setError((error) => ({ status: status, errorMessage: err }));
      }
    });
  }

  function updatePerson(person) {
    return API_USERS.updatePerson(person, (result, status, err) => {
      if (result !== null && (status === 200 || status === 201)) {
        console.log("Successfully updated person with id: " + result.id);
        props.reloadHandler();
      } else {
        setError((error) => ({ status: status, errorMessage: err }));
      }
    });
  }

  function handleSubmit() {
    let person = {
      name: formControls.name.value,
      username: formControls.username.value,
      password: formControls.password.value,
      age: formControls.age.value,
      address: formControls.address.value,
    };
    if (props.user) {
      person["id"] = props.user.id;
      updatePerson(person);
    } else {
      registerPerson(person);
    }
  }

  return (
    <div>
      <FormGroup id="username">
        <Label for="usernameField"> Username: </Label>
        <Input
          name="username"
          id="usernameField"
          placeholder={formControls.username.placeholder}
          onChange={handleChange}
          defaultValue={formControls.username.value}
          touched={formControls.username.touched ? 1 : 0}
          valid={formControls.username.valid}
          required
        />
        {formControls.username.touched && !formControls.username.valid && (
          <div className={"error-message"}>
            Username must have a valid format
          </div>
        )}
      </FormGroup>
      <FormGroup id="password">
        <Label for="passwordField"> Password: </Label>
        <Input
          name="password"
          id="passwordField"
          placeholder={formControls.password.placeholder}
          onChange={handleChange}
          defaultValue={formControls.password.value}
          touched={formControls.password.touched ? 1 : 0}
          valid={formControls.password.valid}
          required
        />

        {formControls.password.touched && !formControls.password.valid && (
          <div className={"error-message"}>
            Password must have at least 8 characters
          </div>
        )}
      </FormGroup>

      <FormGroup id="name">
        <Label for="nameField"> Name: </Label>
        <Input
          name="name"
          id="nameField"
          placeholder={formControls.name.placeholder}
          onChange={handleChange}
          defaultValue={formControls.name.value}
          touched={formControls.name.touched ? 1 : 0}
          valid={formControls.name.valid}
          required
        />
        {formControls.name.touched && !formControls.name.valid && (
          <div className={"error-message row"}>
            {" "}
            * Name must have at least 3 characters{" "}
          </div>
        )}
      </FormGroup>

      <FormGroup id="address">
        <Label for="addressField"> Address: </Label>
        <Input
          name="address"
          id="addressField"
          placeholder={formControls.address.placeholder}
          onChange={handleChange}
          defaultValue={formControls.address.value}
          touched={formControls.address.touched ? 1 : 0}
          valid={formControls.address.valid}
          required
        />
      </FormGroup>

      <FormGroup id="age">
        <Label for="ageField"> Age: </Label>
        <Input
          name="age"
          id="ageField"
          placeholder={formControls.age.placeholder}
          min={0}
          max={100}
          type="number"
          onChange={handleChange}
          defaultValue={formControls.age.value}
          touched={formControls.age.touched ? 1 : 0}
          valid={formControls.age.valid}
          required
        />
      </FormGroup>

      <Row>
        <Col sm={{ size: "4", offset: 8 }}>
          <Button type={"submit"} onClick={handleSubmit}>
            Submit
          </Button>
        </Col>
      </Row>

      {error.status > 0 && (
        <APIResponseErrorMessage
          errorStatus={error.status}
          error={error.errorMessage}
        />
      )}
    </div>
  );
}

export default PersonForm;
