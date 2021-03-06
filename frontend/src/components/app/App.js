import React, { Component } from 'react';
import MessageList from '../messageList/messageList';
import MessageForm from '../messageForm/messageForm';
import ErrorHandler from '../errorHandler/errorHandler';
import './App.css';

import axios from 'axios';
const PORT = 'http://localhost:3001';

class MessageApp extends Component {
  constructor(){
    super()
    this.state = {
      messages: [{"content": "Hello","date": "2019-11-27T18:59:53.347Z","id": 1}]
    }
  }

  setError(error) {
    this.setState({
      error: error
    })
  }

  setMessages(messages) {
    this.setState({
      messages: messages
    })
  }

  getAllMessages = () => {
    axios.get(`${PORT}/`)
    .then((result) => {
      this.setMessages(result.data)
    })
    .catch((err) => {
      this.setError(err)
    })
  }

  submitMessage = (data) => {
    axios.post(`${PORT}/message`, { content: data })
    .then((result) => this.getAllMessages())
    .catch((err) => this.setError(err))
  }

  sendUpdate = (id, content) => {
    axios.put(`${PORT}/update/${id}`, {
      content: content
    })
    .then((result) => {
      this.getAllMessages()
    })
    .catch((err) => {
      this.setError(err);
    })
  }

  deleteMessage = (id) => {
    axios.delete(`${PORT}/delete/${id}`, { id: id })
    .then((result)=>{ this.getAllMessages() })
    .catch((err)=>{ this.setError(err); })
  }


  componentDidMount(){
    this.getAllMessages()
  }

  render() {
    return (
      <div className="App">
        <ErrorHandler
          error={this.state.error}
        />
        <MessageForm
          ref='messageFormRef'
          submitMessage={this.submitMessage}
        />
        <MessageList
          messages={this.state.messages}
          handleDelete={this.deleteMessage}
          sendUpdate={this.sendUpdate}
        />
      </div>
    );
  }
}

export default MessageApp;
