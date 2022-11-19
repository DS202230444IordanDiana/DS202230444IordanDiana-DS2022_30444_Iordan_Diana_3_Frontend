import { HOST } from "../../commons/hosts";
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
  device: "/device",
};

function getDevices(callback) {
  let request = new Request(HOST.backend_api + endpoint.device, {
    method: "GET",
  });
  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

function updateDevice(params, callback) {
  console.log("PARAMS:", params);
  let request = new Request(HOST.backend_api + endpoint.device + "/update", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

function getDeviceById(params, callback) {
  let request = new Request(HOST.backend_api + endpoint.device + params.id, {
    method: "GET",
  });

  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

function deleteDevice(id, callback) {
  let request = new Request(HOST.backend_api + endpoint.device + "/" + id, {
    method: "DELETE",
  });
  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

function postDevice(device, callback) {
  let request = new Request(HOST.backend_api + endpoint.device, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(device),
  });

  console.log("URL: " + request.url);

  RestApiClient.performRequest(request, callback);
}

function getDevicesByOwner(id, callback) {
  let request = new Request(
    HOST.backend_api + endpoint.device + "/user" + "/" + id,
    {
      method: "GET",
    }
  );
  RestApiClient.performRequest(request, callback);
}

export {
  getDevices,
  getDeviceById,
  getDevicesByOwner,
  updateDevice,
  deleteDevice,
  postDevice,
};
