import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div>
        <div className="message">
          <span className="message-username">{this.props.messages.username}</span>
          <span className="message-content">{this.props.messages.content}</span>
        </div>
      {/* The system message below might need to be moved elsewhere and not rendered like this.
        <div className="message system">
          Anonymous1 changed their name to Adi Bakija.
        </div>
      */}
      </div>
    );
  }
}
export default Message;