const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const { response } = require('express');
const app = express();
const port = 8000;  

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost/todo", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
  username: String, 
  password: String
});
const User = mongoose.model('User', userSchema);

const todosSchema = new mongoose.Schema({
  userId: String,
  todos: [
    {
      text: String,
      checked: Boolean
    }
  ]
});
const Todos = mongoose.model('Todos', todosSchema);


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const isValidUser = await User.findOne({ username }).exec();
    if (isValidUser) {
      res.status(500);
      res.send("user already exists"); 
      return;
    }
    await User.create({ username, password }); 
    res.json({
      message: "success",
    });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const isValidUser = await User.findOne({ username, password }).exec();
  if (!isValidUser) {
    res.status(403);
    res.send("incorrect user or password /login");
    return;
  }
  res.json({
    message: "success",
  })
});

app.post('/todos', async (req, res) => {
  const { authorization  } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosItems = req.body;

  const isValidUser = await User.findOne({ username, password }).exec();
  if (!isValidUser) {
    res.status(403);
    res.send("invalid access: updating todo list");
    return;
  }
  const todos = await Todos.findOne({userId: isValidUser._id}).exec();
  if (!todos) {
    await Todos.create({
      userId: isValidUser._id,
      todos: todosItems
    }
    );
  } else {
    // schema.collection = updated to do list
    todos.todos = todosItems;
    await todos.save();
  }
  res.json(todosItems);
});
  
app.get('/todos', async (req, res) => {
  const { authorization  } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");

  const isValidUser = await User.findOne({ username, password }).exec();
  if (!isValidUser) {
    res.status(403);
    res.send("invalid access: accessing todo list");
    return;
  }
  const isValidTodo = await Todos.findOne({userId: isValidUser._id}).exec();
  if (!isValidTodo) {
    await Todos.create();
    res.json();
  } else {
    const { todos } = await Todos.findOne({userId: isValidUser._id}).exec();
    res.json(todos);
  }
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once('open', function() {
  app.listen(port, () => {
    console.log(`Example App listening at http://localhost:${port}`);
  }); 
})