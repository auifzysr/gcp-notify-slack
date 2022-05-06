// needs to:
// - get bot token scope
// - grant chat:write to the scope
// - specify the token formatted like xoxb-...
// 

const { WebClient } = require('@slack/web-api');

module.exports.Client = class client {
  constructor(token, channel) {
    this.client = new WebClient(token);
    this.channel = channel;
  }

  async postMessage(text, blocks, attachments) {
    const result = await this.client.chat.postMessage({
      text: text,
      blocks: blocks,
      attachments: attachments,
      channel: this.channel
    });
    console.log(result);
  }
};

module.exports.messageObjectComposer = (...middlewares) => {
  const middlewareStack = middlewares;

  const use = (...middlewares) => {
    middlewareStack.push(...middlewares);
  }

  const compose = async (rawData, messageObject) => {
    let prevIndex = -1;
    const composer = async (index) => {
      if (index === prevIndex) {
        throw new Error('next() called multiple times');
      }

      prevIndex = index;
      
      const middleware = middlewareStack[index];

      if (middleware) {
        await middleware(rawData, messageObject, () => {
          return composer(index + 1);
        })
      }
    }

    await composer(0);
  }

  return { use, compose };
};
