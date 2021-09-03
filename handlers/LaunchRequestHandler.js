const Alexa = require("ask-sdk-core");

const OpenAI = require('openai-api');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI(OPENAI_API_KEY);


const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest";
  },
  async handle(handlerInput) {
    console.info("[LaunchRequestHandler] Received.")
    

    let speechText = `Welcome. Say interview me to get general questions, or interview me on topic to get topic-specific questions. Say HELP to learn about all other commands.`

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  }
};

module.exports = LaunchRequestHandler;