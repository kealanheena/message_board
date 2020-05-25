import React from 'react';
import MessageList from './components/messageList';
import MessageForm from './components/messageForm';
import './App.css';

function MessageApp() {
  return (
    <div className="App">
      <MessageForm/>
      <MessageList/>
    </div>
  );
}

export default MessageApp;
