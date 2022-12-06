import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Table from "../commons/tables/table";
import * as API_MEASUREMENTS from "./measurement-api";

function MeasurementTable(props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchMeasurements();
    setLoaded(false);
  }, []);

  const columns = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Time",
      accessor: "time",
    },
    {
      Header: "Value",
      accessor: "value",
    },
  ];

  const filters = [
    {
      accessor: "id",
    },
  ];

  function fetchMeasurements() {
    API_MEASUREMENTS.getMeasurements(props.deviceId, (result, status, err) => {
      if (result !== null && status === 200) {
        props.setMeasurementData(result);
        setLoaded(true);
        console.log(result);
      }
    });
  }

  return (
    <div>
      {loaded > 0 && (
        <Table
          data={props.tableData}
          columns={columns}
          search={filters}
          pageSize={5}
        />
      )}
    </div>
  );
}

export default MeasurementTable;
