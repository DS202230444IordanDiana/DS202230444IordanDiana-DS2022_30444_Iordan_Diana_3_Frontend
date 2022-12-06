import React from "react";
import { AiOutlineLineChart } from "react-icons/ai";
import { BsThermometerHalf } from "react-icons/bs";
import Table from "../commons/tables/table";

function UserDeviceTable(props) {
  function showChart(id) {
    props.setId(id);
    props.toggleForm();
  }

  function showMeasurements(id) {
    props.setId(id);
    props.toggleMeasurementForm();
  }

  const columns = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Model",
      accessor: "model",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Cell: (content) => (
        <AiOutlineLineChart
          style={{ fontSize: "40px" }}
          onClick={() => {
            showChart(content.row.id);
          }}
        />
      ),
    },
    {
      Cell: (content) => (
        <BsThermometerHalf
          style={{ fontSize: "40px" }}
          onClick={() => {
            showMeasurements(content.row.id);
          }}
        />
      ),
    },
  ];

  const filters = [
    {
      accessor: "model",
    },
  ];

  return (
    <Table
      data={props.tableData}
      columns={columns}
      search={filters}
      pageSize={5}
    />
  );
}

export default UserDeviceTable;
