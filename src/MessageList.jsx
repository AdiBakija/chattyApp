import React, {Component} from 'react';
import Message from './Message.jsx';
//This component represents the full list of messages/notifications being rendered to the app
class MessageList extends Component {
  render() {
    //This constant maps each individual message to the message component
    //Note that when using curly braces after fat arrow function notation a return is required
    const messages = this.props.messages.map(message =>
      <Message key={message.id} messages={message} userColor={this.props.userColor} />
    );
    return (
     <main className="messages">
      {messages}
    </main>
    );
  }
}
export default MessageList;