import React from "react";

import Table from "../../commons/tables/table";
import { BsTrash } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

function DeviceTable(props) {
  const columns = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Model",
      accessor: "model",
    },
    {
      Header: "Owner",
      accessor: "ownerUsername",
    },
    {
      Header: "Limit",
      accessor: "limit",
    },
    {
      Cell: (content) => (
        <BsTrash onClick={() => props.deleteDevice(content.row.id)} />
      ),
    },
    {
      Cell: (content) => (
        <AiFillEdit onClick={() => props.updateDevice(content.row)} />
      ),
    },
  ];

  const filters = [
    {
      accessor: "owner",
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

export default DeviceTable;
