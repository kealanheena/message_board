import React, { Component } from 'react';
import MessageList from '../messageList/messageList';
import MessageForm from '../messageForm/messageForm';
import './App.css';

import axios from 'axios';
const PORT = 'http://localhost:3000';

class MessageApp extends Component {
  constructor(){
    super()
    this.state = {
      messages: []
    }
  }

  getAllMessages = () => {
    axios.get(`${PORT}/`)
    .then((result) => {
      this.setState({
        messages: result.data
      })
    })
  }

  submitMessage = (data) => {
    axios.post(`${PORT}/message`, {
      content: data
    })
    .then(() => this.getAllMessages())
  }


  // componentDidMount(){
  //   this.getAllMessages()
  // }

  render() {
    return (
      <div className="App">
        <MessageForm
          ref='messageFormRef'
          submitMessage={this.submitMessage}
        />
        <MessageList/>
      </div>
    );
  }
}

export default MessageApp;
