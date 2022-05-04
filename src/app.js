// needs to:
// - get bot token scope
// - grant chat:write to the scope
// - specify the token formatted like xoxb-...

const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

const messageBody = "test";
const channel = "development";

(async () => {
  const result = await web.chat.postMessage({
    text: messageBody,
    channel: channel
  });
  console.log(result);
})();