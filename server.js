const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:694b562f-9cb2-4235-bf92-85d4a3c430b8',
  key: '6038c7e6-c8c8-4364-b485-0b528e333880:2qyfzYIFSr09ook1kkYsREwC6xibRhkpWOs5hBFq1Ss='
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
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
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
