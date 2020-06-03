import React from 'react'; 

class MessageList extends React.Component {
  render() {
    if (this.props.messages) {
      return (
        <ul id="message_list">
          {this.props.messages.map(message => {
            return <li
              className='message'
              key={message.id}>
                {message.content}
                <br/>
                {message.date}
                <br/>
                <button
                  id="delete"
                  onClick={ () => this.props.handleDelete(message.id) }>
                    delete
                  </button>
              </li>
          })}
        </ul>
      )
    } else {
      return (
        <ul id="message_list">no messages</ul>
      )
    }
  }
}

export default MessageList;