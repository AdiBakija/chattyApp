import React, {Component} from 'react';

class ChatBar extends Component {
  handleKeyPress = (event) => {
    let enteredMessage = event.target.value;
    if(event.key == 'Enter'){
      this.props.addMessages(enteredMessage)
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress}/>
      </footer>
    );
  }
}
export default ChatBar;