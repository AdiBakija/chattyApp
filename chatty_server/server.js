// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
uuidv4();

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (client) => {
  console.log("Client connected")
  const updateUserAmount = () => {
    const numClients = {
      type: "incomingUserAmount",
      numUsers: wss.clients.size
    }
    broadCastAll(numClients);
  }
  updateUserAmount();

  const assignUserColour = () => {
    const colorArray = ['blue', 'red', 'pink', 'yellow', 'orange',
        'black', 'cyan', 'grey'];
    let randomColor = colorArray[Math.floor(Math.random()*colorArray.length - 1)];
    const colorObj = {
      type: "incomingColor",
      color: randomColor
    }
    client.send(JSON.stringify(colorObj));
  }
  assignUserColour();

  //Handles incoming message information from the clients.
  client.on('message', (event) => {
    //Parses the received information from the client side and parses it back into JSON
    const parsedEvent = JSON.parse(event);
    //Accessed the message from the parsed event object and broadcast it back to clients
    if (parsedEvent.type === "postMessage") {
      const messageObj = {
        type: "incomingMessage",
        id: uuidv4(),
        username: parsedEvent.username,
        content: parsedEvent.content,
        color: parsedEvent.color,
        url: parsedEvent.url
      }
      broadCastAll(messageObj);

    } else if (parsedEvent.type === "postNotification") {
      const notificationObj = {
        type: "incomingNotification",
        content: parsedEvent.content
      }
      broadCastAll(notificationObj);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    console.log('Client disconnected');
    //Ensures the user amount is updated when a user leaves.
    updateUserAmount();
  });
});

//This is a helper function to broadcast data objects back to each client.
const broadCastAll = (data) => {
  wss.clients.forEach( (client) => {
    client.send(JSON.stringify(data));
  });
}
