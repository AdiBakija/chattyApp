import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser: {
        name: "Anonymous",
        color: "black"
      },//The current user will be stored here
      messages: [], // messages coming from the server will be stored here as they arrive
      userCount: null
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
    //Intercept all data returned from the server and broadcast to all clients by
    //updating the state. This is called within this lifecycle method to ensure all users have the latest data.
    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      if (data.type === "incomingMessage") {
        const messages = this.state.messages.concat(data);
        this.setState({messages: messages});
      } else if (data.type === "incomingNotification") {
        const notifications = this.state.messages.concat(data);
        this.setState({messages: notifications});
      } else if (data.type === "incomingUserAmount") {
        this.setState({userCount: data.numUsers})
      } else if (data.type === "incomingColor") {
        let currentUser = {...this.state.currentUser}
        currentUser.color = data.color;
        this.setState({currentUser: currentUser})
      }
    }
  }

  //A method for sending messages to the server, it is linked directly with the enter key handler found
  //inside of the ChatBar component which is where it receives message content.
  addMessages = (message, url) => {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: message,
      color: this.state.currentUser.color,
      url: url
    };
    //How the message is communicated to the server
    this.socket.send(JSON.stringify(newMessage));
  }
  //A method to update the current users name state based on the input they provide from
  //the onChange handler found inside of the ChatBar component
  addNewUserName = (name) => {
    const currentUser = {
      name: name,
      color: this.state.currentUser.color
    }
    const nameChange = {
      type: "postNotification",
      content: `${this.state.currentUser.name} changed their name to ${name}`
    }
    //How the notification is communicated to the server
    this.socket.send(JSON.stringify(nameChange));
    this.setState({currentUser});
  }

  render() {

    let users;
    this.state.userCount === 1? users = (<p className="navbar-users">{this.state.userCount} user online</p>) : users = (<p className="navbar-users">{this.state.userCount} users online</p>)

      return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          {users}
        </nav>
        <MessageList messages={this.state.messages} userColor={this.state.currentUser.color}/>
        <ChatBar currentUser={this.state.currentUser} addMessages={this.addMessages} addNewUserName={this.addNewUserName}/>
      </div>
    );
  }
}
export default App;
