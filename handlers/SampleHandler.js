const Alexa = require("ask-sdk-core");

const { sampleAnswer } = require('./helpers')

const SampleHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" && Alexa.getIntentName(handlerInput.requestEnvelope) === "SampleIntent";
  },
  async handle(handlerInput) {
    console.info("[SampleHandler] Received.")

    const slots = handlerInput.requestEnvelope.request.intent.slots;    
    let setter = handlerInput.attributesManager
    let am = setter.getSessionAttributes()
    
    let question = null;
    
    if (am.question) {
      question = am.question
      console.log('this is a test', question, am.question)
    }

    if (slots['phrase'].value) {
      question = slots['phrase'].value
      console.log('test')
    }

    console.log('this is a test', question, am.question, slots['phrase'])


    if (!question) {
      return handlerInput.responseBuilder
        .speak("There's no question to give a sample for!")
        .withShouldEndSession(false)
        .getResponse()
    }

    const speechText = await sampleAnswer(question);
    console.log(speechText)
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();


  }
};

module.exports = SampleHandler;