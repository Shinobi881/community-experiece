// Check to see if the user is in our database
  // Yes
    // Look up the user by id in our array
    // Create and push a new message into their submissions array
  // No 
    // Create a new User 
    // Add them to our registries 
    // Push their message into their user array


console.dir(document.body);

var form = document.getElementById('input-form');

var usersObj = {};
var usersArr = [];

function User (name, id) { 
  this.userName = name;
  this.userId = id;
  this.submissions = [];
};

User.prototype.addMessage = function(message) {
  var messageId = this.submissions.length;
  var messageObj = new Message(message, messageId);
  this.submissions.push(messageObj);
};

function Message(text, id) {
  this.text = text;
  this.id = id;
  this.timeStamp = Date.now();
};

var counter = 0;

function createUser(name, id) {
  return new User(name, id);
};

function createMessage(message, id) {
  return new Message(message, id);
};

function getUserId (user) {
  return user.id;
};

function registerUser(user) {
  usersObj[user.userName] = user;
  usersArr.push(user);
};

function getUser (userName) {
  if (!usersObj[userName]) {
    registerUser(createUser(userName, usersArr.length));
  }

  var user = usersObj[userName];

  return usersArr[user.userId];
};

function newMessageTag (message) {
  var tag = document.createElement('h3');
  tag.textContent = message; 
  console.log()
  return tag;
};

function showMessages (user) {
  var messages = user.submissions;
  var messageContainer = document.getElementById('messages-container');

  messageContainer.innerHTML = '';
  messages.forEach( function(message, index) {
    console.log(message);
    messageContainer
      .appendChild(newMessageTag(message.text));
  });
}


form.addEventListener('submit', function (e) {
   event.preventDefault();

  var userName = event.target[0].value;
  var message = event.target[1].value;
  
  var user = getUser(userName);

  user
  .addMessage(message);

  showMessages(user);

  event.target[0].value = '';
  event.target[1].value = '';
  counter++;
});
