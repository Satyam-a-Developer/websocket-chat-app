"use client";

import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

function index() {
  const inputname = useRef();
  const [hide, sethide] = useState(true);
  const namebtn = useRef();
  const messageinput = useRef();
  const messagebtn = useRef();

  const toggleVisibility = () => {
    sethide(!hide);
  };

  useEffect(() => {
    const socket = io("ws://localhost:8080");
    socket.on("name", (name) => {
      console.log(name);
      const el = document.createElement("h2");
      el.innerHTML = name;
      document.querySelector(".name").appendChild(el);
    });

    namebtn.current.onclick = () => {
      const name = inputname.current.value || undefined;
      socket.emit("name", name);
    };

    socket.on("message", (text) => {
      const el = document.createElement("li");
      el.innerHTML = text;
      document.querySelector(".chat").appendChild(el);
    });

    messagebtn.current.onclick = () => {
      const text = messageinput.current.value;
      socket.emit("message", text);
    };
  }, []);
  function nucke() {
    const a = document.querySelector("name-input2");
    a.style.display = "none";
  }
  return (
    <div>
      {hide && (
        <div className="name-input2">
          <h2>pls write your name</h2>
          <input placeholder="name" id="name-input" ref={inputname} />
          <button id="name" ref={namebtn} onClick={toggleVisibility}>
            Send
          </button>
        </div>
      )}
      <div className="slidebar">

     

      <div className="name"></div>
      <div className="chat"></div>
      </div>
      <div className="input">
        <div className="all">
          <input placeholder="message" id="message-input" ref={messageinput} />
          <button id="message" ref={messagebtn}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default index;
