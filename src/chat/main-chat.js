import { Message } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect } from "react";
import "../commons/styles/chat_interface.css";
import "../commons/styles/temporary.css";
import { useState } from "react";
import * as API_CHAT from "./chat-api";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";

const jsonrpc = require("jsonrpc-lite");
var stompClient = null;

function sendMessage(to, message) {
  const requestObj = jsonrpc.request("req-send-001", "send", [
    to,
    JSON.parse(localStorage.getItem("user")).username,
    message,
  ]);
  API_CHAT.sendMessage(JSON.stringify(requestObj), (result, status, err) => {
    if (result !== null && status === 200) {
      console.log(result);
    }
  });
  console.log("Requested object:" + JSON.stringify(requestObj));
}

const SendButton = (props) => {
  return (
    <Button
      onClick={() => {
        sendMessage(props.to, props.message);
        const obj = {
          to: props.to,
          message: props.message,
          from: JSON.parse(localStorage.getItem("user")).username,
        };
        props.setHistoryMessages((oldArray) => [...oldArray, obj]);
        props.setSeen(false);
      }}
      variant="contained"
      endIcon={<SendIcon />}
    >
      Send
    </Button>
  );
};

function handleTyping() {
  console.log("...");
  const to = JSON.parse(sessionStorage.getItem("to")).username;
  const from = JSON.parse(localStorage.getItem("user")).username;

  const requestObj = jsonrpc.request("req-typing-001", "typing", [to, from]);

  API_CHAT.sendMessage(JSON.stringify(requestObj), (result, status, err) => {
    if (result !== null && status === 200) {
      console.log(result);
    }
  });
}

function handleSeen() {
  const to = JSON.parse(sessionStorage.getItem("to")).username;
  const from = JSON.parse(localStorage.getItem("user")).username;
  const requestObj = jsonrpc.request("req-seen-001", "seen", [to, from]);
  API_CHAT.sendMessage(JSON.stringify(requestObj), (result, status, err) => {
    if (result !== null && status === 200) {
      console.log(result);
    }
  });
}

const BottomMessage = (props) => {
  return (
    <div className="message_input_wrapper">
      <TextField
        id="outlined-multiline-flexible"
        multiline
        maxRows={8}
        fullWidth
        onChange={(e) => {
          props.setMessage(e.target.value);
          handleTyping(e);
        }}
        onFocus={handleSeen}
        InputProps={{
          endAdornment: (
            <SendButton
              to={props.to}
              message={props.message}
              setHistoryMessages={props.setHistoryMessages}
              setSeen={props.setSeen}
            />
          ),
        }}
      />
    </div>
  );
};

const TopMenu = (props) => {
  return <div className="top_menu">{props.name}</div>;
};

const UserMessage = (element) => {
  if (element.from === JSON.parse(localStorage.getItem("user")).username) {
    return <div className="user_box_left">{element.message}</div>;
  } else {
    return <div className="user_box_right">{element.message}</div>;
  }
};

const ConversationBox = (props) => {
  return (
    <div>
      {props.historyMessages.map((element) => {
        return <UserMessage from={element.from} message={element.message} />;
      })}
    </div>
  );
};

function displaySeenMessage(historyMessages, isSeen) {
  let lastElement = historyMessages[historyMessages.length - 1];
  console.log(isSeen);
  if (lastElement) {
    console.log(lastElement.from);
    const user = JSON.parse(localStorage.getItem("user"));

    return isSeen && lastElement.from === user.username;
  }
  return false;
}

const MessageBox = (props) => {
  const [message, setMessage] = useState("");
  console.log(
    "FUNCTION RETURNS:" + displaySeenMessage(props.historyMessages, props.seen)
  );
  return (
    <div>
      <TopMenu name={props.to} />
      <div className="messages">
        <ConversationBox historyMessages={props.historyMessages} />
        {displaySeenMessage(props.historyMessages, props.seen) && (
          <div id="seen">Seen</div>
        )}

        {props.isTyping && <div id="type">Typing</div>}
      </div>
      <BottomMessage
        setMessage={setMessage}
        setHistoryMessages={props.setHistoryMessages}
        message={message}
        to={props.to}
        setSeen={props.setSeen}
      />
    </div>
  );
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const MainChat = () => {
  const receiverUser = sessionStorage.getItem("to");
  const [historyMessages, setHistoryMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [seen, setSeen] = useState(false);

  function connect() {
    const to = JSON.parse(sessionStorage.getItem("to"));
    const from = JSON.parse(localStorage.getItem("user"));

    var socket = new SockJS("http://127.0.0.1:8080/ws");
    stompClient = Stomp.over(socket);
    if (to && from) {
      setIsTyping(false);
      stompClient.connect({}, function (frame) {
        console.log("Connected: " + frame);
        stompClient.subscribe(
          "/all/chat/" + from.username + "/" + to.username + "/",
          function (messageOutput) {
            console.log("MESSAGE:", messageOutput.body);
            if (messageOutput.body === "seen") {
              console.log("Seen");
              setSeen(true);
            } else if (messageOutput.body === "typing") {
              setIsTyping(true);
            } else {
              setSeen(false);
              var obj = {
                from: to.username,
                message: messageOutput.body,
                to: JSON.parse(localStorage.getItem("user")).username,
              };
              setHistoryMessages((oldArray) => [...oldArray, obj]);
            }
          }
        );
      });
    }
  }

  useEffect(() => {
    console.log("Connect...");
    connect();
    setSeen(false);
  }, []);

  useEffect(() => {
    async function makeRequest() {
      console.log("before");
      await delay(500);
      setIsTyping(false);
      console.log("after");
    }
    makeRequest();
  });

  if (receiverUser != null) {
    const to = JSON.parse(receiverUser).username;
    return (
      <div>
        <MessageBox
          isTyping={isTyping}
          seen={seen}
          to={to}
          historyMessages={historyMessages}
          setHistoryMessages={setHistoryMessages}
          setSeen={setSeen}
        />
      </div>
    );
  } else {
    return <div>Error</div>;
  }
};
