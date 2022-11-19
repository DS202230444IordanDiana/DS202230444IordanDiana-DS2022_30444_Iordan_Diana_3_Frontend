import React, { useEffect, useState } from "react";
import UserDeviceTable from "./user-device-table";
import * as API_DEVICES from "../admin/api/device-api";

export const UserContainer = () => {
  const [tableData, setTableData] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    API_DEVICES.getDevicesByOwner(user.id, (result, status, err) => {
      if (result !== null && status === 200) {
        setTableData(result);
        setLoaded(true);
      } else {
        setError((error) => ({ status: status, errorMessage: err }));
      }
    });
  }, []);
  console.log(tableData);
  if (user.role !== "USER") {
    return <div>Not allowed</div>;
  }
  return (
    <div>
      {loaded > 0 && <UserDeviceTable tableData={tableData}></UserDeviceTable>}
    </div>
  );
};
