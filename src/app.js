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

  let messaageObject = [];
  const composer = slack.messageObjectComposer((rawData, messageObject, next) => {
    messageObject.push({
      color: "#ff0000",
      blocks: [{
        type: "header",
        text: {
          type: "plain_text",
          text: "some header"
        }
      }]
    })
    next();
  });
  composer.use((rawData, messageObject, next) => {
    
  });
  composer.use(slack.setField("name"));
  composer.compose(rawMessage, blocks);

  slackClient.postMessage(null, blocks, null);
});

module.exports = app;