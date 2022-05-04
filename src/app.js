const express = require('express');
const slack = require('./slack');

const app = express();
app.use(express.json());


const slackToken = process.env.SLACK_TOKEN;
if (slackToken == null) {
  console.log('environment variable SLACK_TOKEN is missing.');
  process.exit(1);
}

const slackChannel = process.env.SLACK_CHANNEL;
if (slackChannel == null) {
  console.log('environment variable SLACK_CHANNEL is missing.');
  process.exit(1);
}

slackClient = new slack.Client(slackToken, slackChannel);


app.post('/', (req, res) => {
  const rawMessage = Buffer.from(req.body.message.data, 'base64').toString().trim();
  res.status(204).send();
  slackClient.postMessage(rawMessage, slackChannel);
});

module.exports = app;