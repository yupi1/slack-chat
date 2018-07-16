const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')

require('dotenv').config();

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: process.env.chatkitInstance,
  key: process.env.chatkitKey
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (reg, res) => {
  const { username } = reg.body;

  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(err => {
      if (err.error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(err.status).json(err)
      }
    })
});

app.post('/authenticate', (reg, res) => {
  const authData = chatkit.authenticate({ userId: reg.query.user_id })
  res.status(authData.status).send(authData.body);
});

const PORT = 3001;
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
