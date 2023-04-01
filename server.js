import express from 'express';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import User from "./models/user.js";
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import Todo from "./models/todo.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const secret = process.env.secret;

await mongoose.connect(/*'mongodb://localhost:27017/auth-todo'*/ process.env.MONGODB_URL, {useNewUrlParser:true, useUnifiedTopology:true});
const db = mongoose.connection;
mongoose.set('useFindAndModify', false);
db.on('error', console.log);

const app = express();
app.use(cookieParser());
app.use(bodyParser.json({extended:true}));
app.use(cors({
  credentials:true,
  origin: 'http://localhost:3000',
}));

app.get('/', (req, res) => {
  res.send('ok');
});

/** Get possible user from DB and verify new user */
app.get('/user', (req, res) => {
  if (!req.cookies.token) {
    return res.json({});
  }
  const payload = jwt.verify(req.cookies.token, secret);
  User.findById(payload.id)
    .then(userInfo => {
      if (!userInfo) {
        return res.json({});
      }
      res.json({name:userInfo.name, id:userInfo._id,email:userInfo.email});
    });
});

/** Register a new user in DB */
app.post('/register', (req, res) => {
  console.log("req is");
  console.log(req);
  const {name, email,password} = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({name:name,password:hashedPassword,email});
  console.log(user);
  User.findOne({email}).then(userInfo => {
    if (userInfo) {
      res.sendStatus(401);
    }
    else{
      user.save().then(userInfo => {
        jwt.sign({name:userInfo.name, id:userInfo._id,email:userInfo.email}, secret, (err,token) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            res.cookie('token', token).json({name:userInfo.name, id:userInfo._id,email:userInfo.email});
          }
        });
      });
    }
  })
});

/** Login a user (if login is valid) */
app.post('/login', (req, res) => {
  const {email,password} = req.body;
  User.findOne({email})
    .then(userInfo => {
      if (!userInfo) {
        return res.sendStatus(401);
      }
      const passOk = bcrypt.compareSync(password, userInfo.password);
      if (passOk) {
        const userName = userInfo.name;
        jwt.sign({id:userInfo._id,email,userName},secret, (err,token) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            res.cookie('token', token).json({name:userInfo.name, id:userInfo._id,email:userInfo.email});
          }
        });
      } else {
        res.sendStatus(401);
      }
    })
});

/** Logout a user and destroy cookie*/
app.post('/logout', (req, res) => {
  res.cookie('token', '').send();
});

/** Get all todos from DB */
app.get('/todos', (req,res) => {
  const payload = jwt.verify(req.cookies.token, secret);
  Todo.where({user:new mongoose.Types.ObjectId(payload.id)})
    .find((err,todos) => {
      res.json(todos);
    })
});

/** Put to add a new todo */
app.put('/todos', (req, res) => {
  const payload = jwt.verify(req.cookies.token, secret);
  const todo = new Todo({
    text:req.body.text,
    done:false,
    user:new mongoose.Types.ObjectId(payload.id),
    dtime:req.body.dtime,
    eType:req.body.eType,
    toUse:req.body.toUse
  });
  todo.save().then(todo => {
    res.json(todo);
  })
});

/** Post to delete/update todos */
app.post('/todos', (req,res) => {
  const payload = jwt.verify(req.cookies.token, secret);
  if (req.body.delete){
    Todo.findByIdAndRemove({_id:new mongoose.Types.ObjectId(req.body.id)}).then(()=>{res.sendStatus(200)});
  }
  /** For future project: Add condition here to recognize and change a todo from one type to another */
  else{
    Todo.updateOne({
      _id:new mongoose.Types.ObjectId(req.body.id),
      user:new mongoose.Types.ObjectId(payload.id)
    }, {
      done:req.body.done,
    }).then(() => {
      res.sendStatus(200);
    });
  }
});

if (process.env.NODE_ENV === "production"){
  app.use(express.static("client-app/build"));
  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"client-app", "build","index.html"));
  });
}

app.listen(process.env.PORT || 4000 , () => {
  console.log('Server is running');
});