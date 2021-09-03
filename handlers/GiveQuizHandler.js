const Alexa = require("ask-sdk-core");

const OpenAI = require('openai-api');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI(OPENAI_API_KEY);

const { generateQuestion, sampleAnswer } = require('./helpers')

const GiveQuizHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" && Alexa.getIntentName(handlerInput.requestEnvelope) === "GetQuizIntent";
  },
  async handle(handlerInput) {
    console.info("[GiveQuizHandler] Received.")
    
    const slots = handlerInput.requestEnvelope.request.intent.slots;
        
    const am = handlerInput.attributesManager.getSessionAttributes()
    
    if (slots['topic']) {
      let modifiedAm = am;
      modifiedAm.topic = slots['topic'];
      handlerInput.attributesManager.setSessionAttributes(modifiedAm)
    }

    let topic = null
    
    if (slots['topic']) {
      topic = slots['topic']
    }

    if (am.topic) {
      topic = am.topic
    }

    if (topic.value) {
      topic = topic.value
    }

console.log('this is topic', topic)
    let question = await generateQuestion(topic)

    let prevSample = await sampleAnswer(question)
console.log('prev sample', prevSample)
    speechText = `${question}... \n\nStart your response with the word ANSWER.\n To get an example, say SAMPLE.`

    console.log("gpt response", speechText)

    handlerInput.attributesManager.setSessionAttributes({question: question, topic: topic, prevSample: prevSample})

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt("If you're stuck, say sample to get some examples. Start your response with the word ANSWER, so it can be recognized by InterviewMe.")
      .withShouldEndSession(false)
      .getResponse();
  }
};

module.exports = GiveQuizHandler;