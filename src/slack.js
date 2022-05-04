// needs to:
// - get bot token scope
// - grant chat:write to the scope
// - specify the token formatted like xoxb-...

const { WebClient } = require('@slack/web-api');

class Client {
  constructor(token, channel) {
    this.client = new WebClient(token);
    this.channel = channel;
  }

  async postMessage(text) {
    const result = await this.client.chat.postMessage({
      text: text,
      channel: this.channel
    });
    console.log(result);
  }  
};

module.exports.Client = Client;