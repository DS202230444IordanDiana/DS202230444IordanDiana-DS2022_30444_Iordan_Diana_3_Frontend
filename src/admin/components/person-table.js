import React from "react";

import Table from "../../commons/tables/table";
import { BsTrash } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import * as API_USERS from "../api/person-api";

function PersonTable(props) {
  const columns = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "Password",
      accessor: "password",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Cell: (content) => (
        <BsTrash onClick={() => props.deletePerson(content.row.id)} />
      ),
    },
    {
      Cell: (content) => (
        <AiFillEdit onClick={() => props.updatePerson(content.row)} />
      ),
    },
  ];

  const filters = [
    {
      accessor: "name",
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

export default PersonTable;
