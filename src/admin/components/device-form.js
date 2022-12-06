import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { FormGroup, Input, Label } from "reactstrap";
import Button from "react-bootstrap/Button";

import * as API_DEVICES from "../api/device-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import Validate from "./validators/person-validators";
import { InputLabel, MenuItem, Select } from "@mui/material";

const formControlsInit = (device) => {
  {
    return {
      type: {
        value: device ? device.type : "",
        placeholder: "Type...",
      },
      model: {
        value: device ? device.model : "",
        placeholder: "Model...",
        valid: false,
        touched: false,
      },
      limit: {
        value: device ? device.model : "",
        placeholder: "Limit...",
        valid: false,
        touched: false,
      },
    };
  }
};

function DeviceForm(props) {
  const [error, setError] = useState({ status: 0, errorMessage: null });
  const [formIsValid, setFormIsValid] = useState(false);
  const [formControls, setFormControls] = useState(
    formControlsInit(props.user)
  );
  const [owner, setOwner] = useState("");

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

  function handleDropdown(event) {
    setOwner(event.target.value);
  }

  function registerDevice(device) {
    return API_DEVICES.postDevice(device, (result, status, err) => {
      if (result !== null && (status === 200 || status === 201)) {
        console.log("Successfully inserted device with id: " + result);
        props.reloadHandler();
      } else {
        setError((error) => ({ status: status, errorMessage: err }));
      }
    });
  }

  function updateDevice(device) {
    return API_DEVICES.updateDevice(device, (result, status, err) => {
      if (result !== null && (status === 200 || status === 201)) {
        console.log("Successfully updated device with id: " + result.id);
        props.reloadHandler();
      } else {
        setError((error) => ({ status: status, errorMessage: err }));
      }
    });
  }

  function handleSubmit() {
    let device = {
      type: formControls.type.value,
      model: formControls.model.value,
      ownerUsername: owner.username,
      limit: formControls.limit.value,
    };

    if (props.device) {
      device["id"] = props.device.id;
      updateDevice(device);
    } else {
      registerDevice(device);
    }
  }

  return (
    <div>
      <FormGroup id="type">
        <Label for="typeField"> type: </Label>
        <Input
          name="type"
          id="typeField"
          placeholder={formControls.type.placeholder}
          onChange={handleChange}
          defaultValue={formControls.type.value}
          touched={formControls.type.touched ? 1 : 0}
          valid={formControls.type.valid}
          required
        />
      </FormGroup>
      <FormGroup id="model">
        <Label for="modelField"> Model: </Label>
        <Input
          name="model"
          id="modelField"
          placeholder={formControls.model.placeholder}
          onChange={handleChange}
          defaultValue={formControls.model.value}
          touched={formControls.model.touched ? 1 : 0}
          valid={formControls.model.valid}
          required
        />
      </FormGroup>
      <FormGroup id="limit">
        <Label for="limitField"> Device Limit: </Label>
        <Input
          name="limit"
          id="limitField"
          type="number"
          placeholder={formControls.limit.placeholder}
          onChange={handleChange}
          defaultValue={formControls.limit.value}
          required
        />
      </FormGroup>
      <FormGroup id="oner">
        <InputLabel id="demo-simple-select-label">Owner</InputLabel>
        <Select
          name="owner"
          id="ownerField"
          label="owner"
          value={owner.username}
          onChange={handleDropdown}
          style={{ width: "400px" }}
        >
          {props.persons.map((item) => (
            <MenuItem value={item}>{item.username}</MenuItem>
          ))}
        </Select>
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

export default DeviceForm;
