const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;
const cors = require("cors")

app.use(
    cors({
      origin: "*",
      // methods: ['GET', 'POST'],
    })
)

app.use(express.json()); // enables us to parse json when using express

app.use('/', require('./controllers/tasks')); // without '/tasks', we need index.js

if(PORT) {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));  
} else {
    console.log("===== ERROR ====\nCREATE A .env FILE!\n===== /ERROR ====")
}
  