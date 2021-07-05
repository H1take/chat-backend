import mongoose from "mongoose";
import express from "express";
import path from "path";
import dotenv from "dotenv";
const bodyParser = require("body-parser");

import { UserController, DialogController, MessageController } from "./controllers";
import { updateLastSeen, checkAuth } from "./middlewares";
import { loginValidation, registerValidation  } from "./utils/validations";

const app = express();
dotenv.config({path: path.resolve(__dirname, '.env')});


app.use(bodyParser.json());
app.use(updateLastSeen);
app.use(checkAuth);

const User = new UserController();
const Dialog = new DialogController();
const Messages = new MessageController();

mongoose.connect("mongodb://localhost:27017/chat", {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.get("/user/:id", User.show);
app.delete("/user/:id", User.delete);
app.post("/user/registration", User.create);
app.post("/user/login", User.login);

app.get("/dialogs", Dialog.index);
app.delete("/dialogs/:id", Dialog.delete);
app.post("/dialogs", Dialog.create);

app.get("/messages", Messages.index);
app.delete("/messages/:id", Messages.delete);
app.post("/messages", Messages.create);

app.listen(process.env.PORT, () => {
  console.log(`Server: http://localhost:${process.env.PORT}`)
});