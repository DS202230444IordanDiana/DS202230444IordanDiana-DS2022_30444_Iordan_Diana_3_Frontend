import React from "react";

import Table from "../commons/tables/table";

function UserDeviceTable(props) {
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
