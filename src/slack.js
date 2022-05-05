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

  async postMessage(blocks) {
    const result = await this.client.chat.postMessage({
      blocks: blocks,
      text: blocks,
      channel: this.channel
    });
    console.log(result);
  }
};

module.exports.Client = Client;

function blocksComposer(...middlewares) {
  const middlewareStack = middlewares;

  const use = (...middlewares) => {
    middlewareStack.push(...middlewares);
  }

  const compose = async (rawData, blocks) => {
    let prevIndex = -1;
    const composer = async (index) => {
      if (index === prevIndex) {
        throw new Error('next() called multiple times');
      }

      prevIndex = index;
      
      const middleware = middlewareStack[index];

      if (middleware) {
        await middleware(rawData, blocks, () => {
          return composer(index + 1);
        })
      }
    }

    await composer(0);
  }

  return { use, compose };
};

module.exports.blocksComposer = blocksComposer;

const setField = (fieldName) => {
  return (rawData, blocks, next) => {
    blocks.push({
      type: "section",
      text: {
        type: "plain_text",
        text: rawData[fieldName]
      }
    })
    next();
  }
};

module.exports.setField = setField;
