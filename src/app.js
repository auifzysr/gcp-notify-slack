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

const slackClient = new slack.Client(slackToken, slackChannel);


app.post('/', (req, res) => {
  const rawMessage = JSON.parse(Buffer.from(req.body.message.data, 'base64').toString().trim());
  res.status(204).send();

  let blocks = [];
  const composer = slack.blocksComposer((rawData, blocks, next) => {
    next();
  });
  composer.use(slack.setField("dataSourceId"));
  composer.use(slack.setField("name"));
  composer.compose(rawMessage, blocks);

  slackClient.postMessage(blocks);
});

module.exports = app;