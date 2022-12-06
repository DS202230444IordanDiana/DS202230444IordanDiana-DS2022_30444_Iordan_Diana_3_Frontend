import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

import * as API_DEVICES from "./api/device-api";
import * as API_USERS from "./api/person-api";

import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import DeviceForm from "./components/device-form";
import DeviceTable from "./components/device-table";
import NavigationBar from "../navigation-bar";

function DeviceContainer() {
  const [isSelected, setIsSelected] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deviceToEdit, setDeviceToEdit] = useState(null);
  const [persons, setPersons] = useState([]);
  const [error, setError] = useState({ status: 0, errorMessage: null });

  function fetchPersons() {
    API_USERS.getPersons((result, status, err) => {
      if (result !== null && status === 200) {
        setPersons(result);
      } else {
        setError((error) => ({ status: status, errorMessage: err }));
      }
    });
  }
  useEffect(() => {
    fetchDevices();
    fetchPersons();
  }, []);

  function fetchDevices() {
    return API_DEVICES.getDevices((result, status, err) => {
      if (result !== null && status === 200) {
        setTableData(result);
        setIsLoaded(true);
      } else {
        setError((error) => ({ status: status, errorMessage: err }));
      }
    });
  }

  function toggleForm() {
    setIsSelected((isSelected) => !isSelected);
  }

  function reload() {
    setIsLoaded((isLoaded) => false);
    toggleForm();
    fetchDevices();
  }

  function deleteDevice(id) {
    setIsLoaded((isLoaded) => false);

    API_DEVICES.deleteDevice(id, (res) => {
      if (res !== null) {
        fetchDevices();
      } else {
        console.log("error");
      }
    });
  }

  function updateDevice(content) {
    let device = {
      id: content.id,
      type: content.type,
      model: content.model,
      ownerUsername: content.ownerUsername,
    };
    setDeviceToEdit(device);
    setIsLoaded((isLoaded) => false);
    toggleForm();
    fetchDevices();
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if (user.role !== "ADMIN") {
    return <div> Access denied </div>;
  }

  return (
    <div>
      <NavigationBar user={user} />

      <CardHeader>
        <strong> Device Management </strong>
      </CardHeader>
      <Card>
        <br />
        <Row>
          <Col sm={{ size: "8", offset: 1 }}>
            <Button
              color="primary"
              onClick={() => {
                setDeviceToEdit(null);
                reload();
              }}
            >
              Add Device{" "}
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={{ size: "8", offset: 1 }}>
            {isLoaded && (
              <DeviceTable
                tableData={tableData}
                deleteDevice={deleteDevice}
                updateDevice={updateDevice}
              />
            )}
            {error.status > 0 && (
              <APIResponseErrorMessage
                errorStatus={error.status}
                error={error.errorMessage}
              />
            )}
          </Col>
        </Row>
      </Card>

      <Modal isOpen={isSelected} toggle={toggleForm} size="lg">
        <ModalHeader toggle={toggleForm}> Add Person: </ModalHeader>
        <ModalBody>
          <DeviceForm
            persons={persons}
            reloadHandler={reload}
            device={deviceToEdit}
            updateDevice={updateDevice}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DeviceContainer;
