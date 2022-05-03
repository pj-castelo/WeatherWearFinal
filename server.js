//loads environment variables from .env file
//keep certain details hidden, in this case, the db server address
require('dotenv').config();

//express.js - framework for node.js
const express = require("express");

//instaniate express and save it in variable
const app = express();

//object data modeling library used with MongoDB
const mongoose = require('mongoose');

//connecting to db
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to database"));

//serves front end files from public folder.
app.use(express.static("public"));

//express built in middleware parses incoming requests with url
app.use(express.urlencoded({extended : true}));

//used for showing front end in views folder using res.render('example-index')
app.set("view engine", "ejs");

//express built in middleware parases incoming  requests with json
app.use(express.json());

//CRUD involving user records
const userRouter = require("./routes/users");
app.use("/users", userRouter);

// http://localhost:3000/ , starts the server
app.listen(3000, () => console.log('Server Started')); 

