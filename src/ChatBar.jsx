import React, {Component} from 'react';

class ChatBar extends Component {
  //This handles the input from the message input and passes it into the addMessages method found within the
  //App component
  handleKeyPressMessage = (event) => {
    let enteredMessage = event.target.value;
    let imageRegex = /(https?:\/\/.*\.(?:png|jpg|gif))/i;
    let imageCheck = enteredMessage.match(imageRegex);
    console.log(imageCheck)
    if(event.key == 'Enter'){
      this.props.addMessages(enteredMessage, url)
      event.target.value = "";
    }
  };
  //This handles the input from the username input and passes it to the addNewUserName method found within the
  //App component
  handleKeyPressUserName = (event) => {
    let enteredName = event.target.value;
    if(event.key == 'Enter') {
      this.props.addNewUserName(enteredName);
    }
  };

  render() {

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your name (optional)" onKeyPress={this.handleKeyPressUserName}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPressMessage}/>
      </footer>
    );
  }
}
export default ChatBar;