const express = require('express');
const postMessage = require('./slack')
const app = express();

app.use(express.json());
const PORT = parseInt(process.env.PORT) || 8080;

app.listen(PORT, () => {
  console.log(`nodejs-pubsub started on port ${PORT}`);
});

const slackChannel = "development"

app.post('/', (req, res) => {
  const pubSubMessage = req.body.message;
  const rawMessage = Buffer.from(pubSubMessage.data, 'base64').toString().trim()
  console.log(`pubSubMessage: ${rawMessage}`);
  res.status(204).send();

  postMessage(rawMessage, slackChannel)();
});