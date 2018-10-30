import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    //This constant maps each individual message to the message component
    //Note that when using curly braces after far arrow function notation a return is required
    const messages = this.props.messages.map(message =>
      <Message key={message.id} messages={message} />
    );
    return (
     <main className="messages">
      {messages}
    </main>
    );
  }
}
export default MessageList;