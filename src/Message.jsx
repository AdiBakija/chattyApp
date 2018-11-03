import React, {Component} from 'react';
//This component represents each individual message being rendered to the app.
class Message extends Component {
  render() {
    let message;
    let userColor = {
      color: this.props.messages.color
    }
    //Render incoming messages whether they include string content or both images and string content.
    //Render notifications when users change names.
    if(this.props.messages.type === "incomingMessage") {
      let imageUrls = [];
      if (this.props.messages.url && this.props.messages.url.length > 0) {
        imageUrls = this.props.messages.url.map((url, index) =>
          (<span key={`img-${index}`}><br/><img src={url}  style={{width: '60%'}}/><br/></span>)
        );
      }
      message = (
        <div className="message">
          <span className="message-username" style={userColor}>{this.props.messages.username}</span>
          <span className="message-content">{this.props.messages.content}{imageUrls}</span>
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