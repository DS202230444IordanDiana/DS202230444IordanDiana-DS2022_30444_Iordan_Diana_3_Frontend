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

import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import PersonForm from "./components/person-form";
import * as API_USERS from "./api/person-api";
import PersonTable from "./components/person-table";
import NavigationBar from "../navigation-bar";

function PersonContainer() {
  const [isSelected, setIsSelected] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const [error, setError] = useState({ status: 0, errorMessage: null });

  // componentDidMount
  useEffect(() => {
    fetchPersons();
  }, []);

  function fetchPersons() {
    return API_USERS.getPersons((result, status, err) => {
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
    fetchPersons();
  }

  function deletePerson(id) {
    setIsLoaded((isLoaded) => false);

    API_USERS.deletePersonById(id, (res) => {
      if (res !== null) {
        fetchPersons();
      } else {
        console.log("error");
      }
    });
  }

  function updatePerson(content) {
    let user = {
      id: content.id,
      name: content.name,
      username: content.username,
      password: content.password,
      age: content.age,
      address: content.address,
    };
    setUserToEdit(user);
    setIsLoaded((isLoaded) => false);
    toggleForm();
    fetchPersons();
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if (user.role !== "ADMIN") {
    return <div> Access denied </div>;
  }

  return (
    <div>
      <NavigationBar user={user} />
      <CardHeader>
        <strong> Person Management </strong>
      </CardHeader>
      <Card>
        <br />
        <Row>
          <Col sm={{ size: "8", offset: 1 }}>
            <Button
              color="primary"
              onClick={() => {
                setUserToEdit(null);
                reload();
              }}
            >
              Add Person{" "}
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={{ size: "8", offset: 1 }}>
            {isLoaded && (
              <PersonTable
                tableData={tableData}
                deletePerson={deletePerson}
                updatePerson={updatePerson}
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
          <PersonForm
            reloadHandler={reload}
            user={userToEdit}
            updatePerson={updatePerson}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default PersonContainer;
