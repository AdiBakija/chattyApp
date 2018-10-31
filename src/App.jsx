import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser: {name: "John Smith"},//The current user will be stored here
      messages: [] // messages coming from the server will be stored here as they arrive
    };
  }

  // Called after the component was rendered and it was attached to the
  // DOM. This is a good place to make AJAX requests or setTimeout.
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");
    //This tests to see connection to server has succeeded
    this.socket.onopen = (evt) => {
      console.log("Connected to server");
    }
    //Intercept all messages returned from the server and broadcast to all clients by updating the state.
    //This is called within this lifecycle method to ensure all users have the latest messages.
    this.socket.onmessage = (event) => {
      let incomingMessage = JSON.parse(event.data);
      const messages = this.state.messages.concat(incomingMessage)
      this.setState({messages});
    }
  }

  //A method for sending messages to the server, it is linked directly with the enter key handler found
  //inside of the ChatBar component which is where it receives message content.
  addMessages = (message) => {
    const newMessage = {
      username: this.state.currentUser.name,
      content: message
    };
    //How the message is communicated to the server
    this.socket.send(JSON.stringify(newMessage));
  }
  //A method to update the current users name state based on the input they provide from
  //the onChange handler found inside of the ChatBar component
  addNewUserName = (name) => {
    const currentUser = {
      name: name
    }
    this.setState({currentUser});
  }

  render() {
      return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addMessages={this.addMessages} addNewUserName={this.addNewUserName}/>
      </div>
    );
  }
}
export default App;
