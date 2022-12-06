import React, { useEffect, useState } from "react";
import UserDeviceTable from "./user-device-table";
import * as API_DEVICES from "../admin/api/device-api";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { DeviceChart } from "./device-chart";
import NavigationBar from "../navigation-bar";
import MeasurementTable from "./measurement-table";

export const UserContainer = () => {
  const [tableData, setTableData] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState();
  const [loaded, setLoaded] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isMeasurementSelected, setIsMeasurementSelected] = useState(false);
  const [measurementData, setMeasurementData] = useState();
  const [id, setId] = useState();

  function toggleForm() {
    setIsSelected((isSelected) => !isSelected);
  }

  function toggleMeasurementForm() {
    setIsMeasurementSelected((isMeasurementSelected) => !isMeasurementSelected);
  }

  function fetchDevices() {
    API_DEVICES.getDevicesByOwner(user.id, (result, status, err) => {
      if (result !== null && status === 200) {
        setTableData(result);
        setLoaded(true);
      } else {
        setError((error) => ({ status: status, errorMessage: err }));
      }
    });
  }

  useEffect(() => {
    fetchDevices();
  }, []);

  function reload() {
    setLoaded(false);
    toggleForm();
  }

  if (user.role !== "USER") {
    return <div>Not allowed</div>;
  }

  return (
    <div>
      <NavigationBar user={user} />

      {loaded > 0 && (
        <UserDeviceTable
          tableData={tableData}
          toggleForm={toggleForm}
          toggleMeasurementForm={toggleMeasurementForm}
          setId={setId}
        ></UserDeviceTable>
      )}

      <Modal isOpen={isSelected} toggle={toggleForm} size="lg">
        <ModalHeader toggle={toggleForm}>Report </ModalHeader>
        <ModalBody>
          <DeviceChart deviceId={id} />
        </ModalBody>
      </Modal>

      <Modal
        isOpen={isMeasurementSelected}
        toggle={toggleMeasurementForm}
        size="lg"
      >
        <ModalHeader toggle={toggleMeasurementForm}>Report </ModalHeader>
        <ModalBody>
          <MeasurementTable
            tableData={measurementData}
            deviceId={id}
            setMeasurementData={setMeasurementData}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};
