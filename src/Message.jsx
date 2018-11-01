import React, {Component} from 'react';

class Message extends Component {
  render() {
    let message;
    if(this.props.messages.type === "incomingMessage") {
      message = (
        <div className="message">
          <span className="message-username">{this.props.messages.username}</span>
          <span className="message-content">{this.props.messages.content}</span>
        </div>);
    } else if (this.props.messages.type === "incomingNotification") {
      message = (
        <div className="message system">
          {this.props.messages.content}
        </div>);
    }
    return (
      <div>
       {message}
      </div>
    );
  }
}
export default Message;