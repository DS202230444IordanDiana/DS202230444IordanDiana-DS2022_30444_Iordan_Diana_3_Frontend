import { HOST } from "../commons/hosts";
import RestApiClient from "../commons/api/rest-client";

const endpoint = {
  chat: "/chat",
};

function sendMessage(jsonRPCObject, callback) {
  let request = new Request(HOST.backend_api + endpoint.chat, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: jsonRPCObject,
  });

  console.log("URL: " + request.url);
  RestApiClient.performRequest(request, callback);
}

export { sendMessage };
