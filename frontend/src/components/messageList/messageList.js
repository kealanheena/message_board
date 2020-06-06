import React from 'react'; 

class MessageList extends React.Component {
  
  formatMessage(message){
    return (
      <li
      className='message'
      key={message.id}>
        {message.content}
          <br/>
        {new Date(message.date).toLocaleTimeString('en-UK')} 
          <br/>
        {new Date(message.date).toLocaleDateString('en-UK')}
      <button
      id='delete'
      onClick={()=>this.props.handleDelete(message.id)}>
        delete
      </button>
      <button
      id='update'>
        update
      </button>
      </li>
    )
  }
  render() {
    if (this.props.messages && !this.props.messages.length === 0) {
      return (
      <div>
        <ul id='message_list'>
          { this.props.messages.map( message => { return this.formatMessage(message) } ) }
        </ul>
      </div>
      )
    } else {
      return (
        <ul id="message_list">no messages</ul>
      )
    }
  }
}

export default MessageList;