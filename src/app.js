const express = require('express');
const dayjs = require('dayjs');

const slack = require('./slack');
const middleware = require('./middleware')

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

const composer = slack.messageObjectComposer(middleware.setHeader("#ff0000", "some header"));
composer.use(middleware.addField("state"));
composer.use(middleware.addField("dataSourceId"));
composer.use(middleware.addField("name"));
composer.use(middleware.addField("params"));
composer.use(middleware.addField("errorStatus"));
composer.use(middleware.addField("endTime"));
composer.use(middleware.addField("notificationPubsubTopic"));
composer.use(middleware.setFooter(dayjs().format("YYYY-MM-DDThh:mm:ssZ")));

app.post('/', (req, res) => {
  const rawMessage = JSON.parse(Buffer.from(req.body.message.data, 'base64').toString().trim());
  res.status(204).send();

  let attachments = []
  composer.compose(rawMessage, attachments);
  slackClient.postMessage(null, null, attachments);
});

module.exports = app;