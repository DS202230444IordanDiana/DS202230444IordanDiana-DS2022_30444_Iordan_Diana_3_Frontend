import React from "react";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import NavigationBar from "../../navigation-bar";

var stompClient = null;
var socket = new SockJS("http://127.0.0.1:8080/ws");

function setConnected(connected) {
  document.getElementById("connect").disabled = connected;
  document.getElementById("disconnect").disabled = !connected;
  document.getElementById("conversationDiv").style.visibility = connected
    ? "visible"
    : "hidden";
  document.getElementById("response").innerHTML = "";
}

function connect() {
  const user = JSON.parse(localStorage.getItem("user"));
  stompClient = Stomp.over(socket);
  if (user) {
    stompClient.connect({}, function (frame) {
      setConnected(true);
      console.log("Connected: " + frame);
      stompClient.subscribe(
        "/all/messages/" + user.username,
        function (messageOutput) {
          showMessageOutput(JSON.parse(messageOutput.body));
        }
      );
    });
  }
}

function sendTypingNotification() {}
function disconnect() {
  console.log("here");
  if (stompClient != null) {
    stompClient.disconnect();
    stompClient = null;
  }
  setConnected(false);
  console.log("Disconnected");
}

function showMessageOutput(messageOutput) {
  console.log(messageOutput);
  var response = document.getElementById("response");
  var p = document.createElement("p");
  p.style.wordWrap = "break-word";
  p.appendChild(
    document.createTextNode(
      new Date(messageOutput.time).toDateString() +
        " " +
        new Date(messageOutput.time).toTimeString() +
        ": " +
        messageOutput.text
    )
  );
  response.appendChild(p);
}

export const NotificationPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user.role !== "USER") {
    return <div>Not allowed</div>;
  }

  return (
    <div>
      <NavigationBar user={user} />{" "}
      <div>
        <div>
          <button id="connect" onClick={connect}>
            See notifications
          </button>
          <button
            id="disconnect"
            onClick={() => {
              disconnect();
            }}
          >
            Stop
          </button>
        </div>
        <br />
        <div id="conversationDiv">
          <p id="response"></p>
        </div>
      </div>
    </div>
  );
};
