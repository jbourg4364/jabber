import React, { useEffect, useState, useRef } from "react";
import { getUserMessages, sendMessage, deleteMessage } from "../api-client";
import "./Messages.css";

const Messages = ({ users }) => {
  const [messages, setMessages] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [subject, setSubject] = useState("");
  const [senderId, setRecipient] = useState("");
  const [description, setDescription] = useState("");
  const [sent, setSent] = useState([]);
  const [compose, showCompose] = useState(false);
  const user = localStorage.getItem("currentUser");
  const token = localStorage.getItem("token");
  const inputElement = useRef();

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
    const filteredInbox =
      messages.length > 0
        ? messages.filter((message) => message.senderId === user)
        : [];
    setInbox(filteredInbox);
  }, [messages, user]);

  useEffect(() => {
    const filteredSent =
      messages.length > 0
        ? messages.filter((message) => message.creatorId === user)
        : [];
    setSent(filteredSent);
  }, [messages, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(user, token, description, senderId, subject);
    window.alert(`Your message has been sent to ${senderId}`);
    setMessages((prevMessages) => {
      const newMessage = {
        senderId: senderId,
        creatorId: user,
        subject: subject,
        description: description,
      };
      return [newMessage, ...prevMessages];
    });
    
    

    setSubject("");
    setDescription("");
    setRecipient("");
    showCompose(false);
  };

  const handleDelete = async (messageId) => {
    await deleteMessage(user, token, messageId);
    window.alert("The message has been successfully deleted.");

    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId)
    );
  };

  const handleReply = (creatorId, messageSubject) => {
    showCompose(true);
    setRecipient(creatorId);
    setSubject(`Replying to: '${messageSubject}'`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="messages" key="messages">
      <h2 key={user.id}>
        Messages for {user}
      </h2>
      {compose ? (
        <div>
          <form
            className="message-send-form"
            ref={inputElement}
            onSubmit={handleSubmit}
          >
            <select
              className="dropdown"
              onChange={(e) => setRecipient(e.target.value)}
              value={senderId}
            >
              <option >Select Recipient</option>
              {users.map((recipient) => {
                return (
                  <option key={recipient.id} value={recipient.username}>
                    {recipient.username}
                  </option>
                );
              })}
            </select>
            <input
              placeholder="Subject"
              onChange={(e) => setSubject(e.target.value)}
              type="text"
              required
              value={subject}
            />
            <input
              id="message-field"
              placeholder="Message"
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              required
              value={description}
            />
            <div className="button-container">
              <button className="message-button">Send</button>
              <button
                className="message-button"
                onClick={() => showCompose(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <h3 className="compose-container" onClick={() => showCompose(true)}>
          Compose New Message
        </h3>
      )}
      {inbox.map((message) => (
        <div className="message-container" key={message.id}>
          <div className="icon-container">
            <h3 className="message-from" key={message.creatorId}>{message.creatorId}</h3>
            <i
              id="icon"
              className="fa-solid fa-message fa-beat fa-2xl"
              style={{ color: "#800000" }}
            ></i>
          </div>
          <h4 className="message-subject">Subject: {message.subject}</h4>
          <p className="message-description">{message.description}</p>
          <button
            onClick={() => handleReply(message.creatorId, message.subject)}
            className="reply-button"
          >
            Reply
          </button>
          <button 
          onClick={() => handleDelete(message.id)}
          className="reply-button"
          >Delete</button>
        </div>
      ))}
      <br></br>
      <h3>- Sent -</h3>
      {sent.map((message) => (
        <div key={message.id} className="message-container">
          <div className="icon-container">
            <h3 className="message-from">{message.senderId}</h3>
          </div>
          <h4 className="message-subject">Subject: {message.subject}</h4>
          <p>
            Sent on: <em>{`${formatDate(message.postdate)}`}</em>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
