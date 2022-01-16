require('./mongodb/db')
//require("https").globalAgent.options.rejectUnauthorized=false

if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}
const express = require('express');
const fileUpload = require('express-fileupload');
const cookieSession = require('cookie-session')
const cors = require('cors')
const app = express();
const port=process.env.PORT||5000;
// in latest body-parser use like below.
app.use(fileUpload());
app.use(cors())

/*
const mongoConnection=require('mongoose')
const connection=mongoConnection.connection;
const passport=require('passport')
*/
const passportContol=require("./passport/index")
const session=require('express-session')


app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

const router1=require('./router/account')
const router2=require('./router/post')
const router3=require('./router/request')
const router4=require('./router/settings')

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))

/* this set of code has to be blow this "app.use(flash())"  "app.use(session({})"*/
app.use(passportContol.initialize());
app.use(passportContol.session());

app.use("/",router1);
app.use("/",router2);
app.use("/",router3);
app.use("/",router4);


app.listen(port ,()=>console.log(`server started.... ${port}`))
//chinaza100*
/*
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "server": "nodemon server",
    "client": "cd client && npm start",
    "dev": "concurrently -n 'server,client' \"nodemon server.js\" \"npm run client\""
  }*/