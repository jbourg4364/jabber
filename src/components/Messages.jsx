import React, { useEffect, useState } from "react";
import { getUserMessages } from "../api-client";
import './Messages.css';


const Messages = ({ users }) => {
  const [messages, setMessages] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [sent, setSent] = useState([]);
  const [compose, showCompose] = useState(false);
  const user = localStorage.getItem("currentUser");
  const token = localStorage.getItem("token");
  console.log(users);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const messages = await getUserMessages(user, token);
        setMessages(messages);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };
    fetchData();
  }, [user, token]);

  useEffect(() => {
    const filteredInbox = messages.filter(
      (message) => message.senderId === user
    );
    setInbox(filteredInbox);
  }, [messages, user]);

  return (
    <div className="messages">
      <h2>
        Messages for <em>{user}</em>
      </h2>
      {compose ? (
        <div>
          <form>
            <select>
              {users.map((user) => {
                return <option key={user.id}>{user.username}</option>;
              })}
            </select>
            <input placeholder="Subject" />
            <input placeholder="Message" />
            <button>Send</button>
            <button onClick={() => showCompose(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <h3 className="compose-container" onClick={() => showCompose(true)}>
          Compose New Message
        </h3>
      )}
      {inbox.map((message) => (
        <div key={message.id} className="message-container">
          <div className="icon-container">
            <h3 className="message-from">{message.creatorId}</h3>
            <i
              id="icon"
              className="fa-solid fa-message fa-beat fa-2xl"
              style={{ color: "#800000" }}
            ></i>
          </div>
          <h4 className="message-subject">Subject: {message.subject}</h4>
          <p className="message-description">{message.description}</p>
          <button>Reply</button>
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Messages;
