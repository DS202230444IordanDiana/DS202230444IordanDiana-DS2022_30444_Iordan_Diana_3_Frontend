import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { FormGroup, InputLabel, MenuItem, Select } from "@mui/material";
import * as API_MEASUREMENTS from "./measurement-api";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";
import { ConstructionOutlined } from "@mui/icons-material";
import NavigationBar from "../navigation-bar";

function getTodayDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  return new Date(today);
}

export const DeviceChart = (props) => {
  const today = getTodayDate();
  const [hour, setHour] = useState();
  const [date, setDate] = useState(today);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [chartData, setChartData] = useState([]);
  const hours = Array.from(Array(24).keys());

  function fetchMeasurements() {
    API_MEASUREMENTS.getMeasurements(props.deviceId, (result, status, err) => {
      if (result !== null && status === 200) {
        setData(result);
      }
    });
  }

  function checkDate(pickedDate, date) {
    if (
      pickedDate &&
      pickedDate.getDate() == date.getDate() &&
      pickedDate.getMonth() == date.getMonth() &&
      pickedDate.getFullYear() == date.getFullYear()
    ) {
      return true;
    }

    return false;
  }

  function handleData(obj) {
    setLoaded(false);
    fetchMeasurements();

    data.map((item) => {
      item.time = new Date(JSON.parse(JSON.stringify(item.time)));
    });

    filterData(obj);
  }

  function filterData(obj) {
    const temporaryData = [{ x: 0, y: 0 }];
    data.map((item) => {
      if (checkDate(item.time, obj.date) && item.time.getHours() == obj.hour) {
        const p = {
          x: JSON.parse(JSON.stringify(item.time.getMinutes())),
          y: JSON.parse(JSON.stringify(item.value)),
        };
        temporaryData.push(p);
      }
    });
    if (temporaryData.length === 1) {
      setChartData([]);
    } else {
      setChartData(temporaryData);
    }
    setLoaded(true);
  }

  function handleDropdown(e) {
    const obj = { date: date, hour: e.target.value };
    setHour(e.target.value);
    handleData(obj);
  }

  function handleDatePicker(e) {
    const obj = { date: new Date(e.target.value), hour: hour };
    setDate(new Date(e.target.value));
    handleData(obj);
  }

  return (
    <div>
      <InputLabel id="date--select-label">Date</InputLabel>
      <TextField
        type="date"
        onChange={(e) => {
          handleDatePicker(e);
        }}
        defaultValue={"2022-11-22"}
      />
      <FormGroup>
        <InputLabel id="hour-select-label">Hour</InputLabel>
        <Select
          name="hour"
          id="hourField"
          label="hour"
          value={hour}
          onChange={(e) => {
            handleDropdown(e);
          }}
          style={{ width: "200px" }}
        >
          {hours.map((item) => (
            <MenuItem defaultValue={10} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>
      <div style={{ width: "800px" }}>
        {chartData.length > 0 ? (
          <VictoryChart theme={VictoryTheme.material} domainPadding={40}>
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" },
              }}
              data={chartData}
            />
          </VictoryChart>
        ) : (
          <div>No values found</div>
        )}
      </div>
    </div>
  );
};
