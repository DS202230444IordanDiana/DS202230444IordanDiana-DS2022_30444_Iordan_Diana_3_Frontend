import React from "react";
import { AiFillWechat, AiOutlineLineChart } from "react-icons/ai";
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

  function chatWithAdmin() {
    const receiver = { username: "admin" };
    sessionStorage.setItem("to", JSON.stringify(receiver));
    window.open("/chat", "_blank");
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
          cursor={"pointer"}
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
          cursor={"pointer"}
          style={{ fontSize: "40px" }}
          onClick={() => {
            showMeasurements(content.row.id);
          }}
        />
      ),
    },
    {
      Cell: (content) => (
        <AiFillWechat
          cursor={"pointer"}
          size={"40px"}
          onClick={chatWithAdmin}
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
