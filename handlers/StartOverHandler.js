const Alexa = require("ask-sdk-core");

const StopHandler = {
  canHandle(handlerInput) {

    return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" && Alexa.getIntentName(handlerInput.requestEnvelope) == "StartOverIntent";
    
  },
  handle(handlerInput) {
    console.info("[StartOverHandler] Received.")
    
    let setter = handlerInput.attributesManager
    let am = setter.getSessionAttributes()

    if (!am.question) {
      return handlerInput.responseBuilder
      .speak(`There's nothing to repeat! Say interview me to start getting questions, and HELP for more information.`)
      .withShouldEndSession(false)
      .getResponse();
    }

    let speechText = `Okay. Here's the question: ${am.question}`


    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("Stopped Quiz", speechText)
      .withShouldEndSession(false)
      .getResponse();


  }
};

module.exports = StopHandler;