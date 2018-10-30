import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  // Called after the component was rendered and it was attached to the
  // DOM. This is a good place to make AJAX requests or setTimeout.
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  generateRandomId = (alphabet => {
    const alphabetLength = alphabet.length;
    const randoIter = (key, n) => {
      if (n === 0) {
        return key;
      }
      const randoIndex = Math.floor(Math.random() * alphabetLength);
      const randoLetter = alphabet[randoIndex];
      return randoIter(key + randoLetter, n - 1);
    };
    return () => randoIter("", 10);
  })("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

  addMessages = (message) => {
    const newMessage = {
      id: this.generateRandomId(),
      username: this.state.currentUser.name,
      content: message
    };
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }

  render() {
      return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addMessages={this.addMessages}/>
      </div>
    );
  }
}
export default App;
