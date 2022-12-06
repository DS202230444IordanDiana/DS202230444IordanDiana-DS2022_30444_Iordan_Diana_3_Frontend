import { HOST } from "../commons/hosts";
import RestApiClient from "../commons/api/rest-client";

const endpoint = {
  measurement: "/device/measurements",
};

function getMeasurements(id, callback) {
  let request = new Request(
    HOST.backend_api + endpoint.measurement + "/" + id,
    {
      method: "GET",
    }
  );
  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

export { getMeasurements };
