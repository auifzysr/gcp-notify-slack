// needs to:
// - get bot token scope
// - grant chat:write to the scope
// - specify the token formatted like xoxb-...

const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

module.exports = (text, channel) => async () => {
  const result = await web.chat.postMessage({
    text: text,
    channel: channel
  });
  console.log(result);
};