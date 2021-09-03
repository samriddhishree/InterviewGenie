const Alexa = require("ask-sdk-core");

const StopHandler = {
  canHandle(handlerInput) {
    
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" && (Alexa.getIntentName(handlerInput.requestEnvelope) === "StopIntent" || Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.");
  
  },
  handle(handlerInput) {
    console.info("[StopHandler] Received.")
    
    let setter = handlerInput.attributesManager
    let am = setter.getSessionAttributes()

    setter.setSessionAttributes(null)

    const speechText = "You Stopped The Quiz.";
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("Stopped Quiz", speechText)
      .withShouldEndSession(true)
      .getResponse();


  }
};

module.exports = StopHandler;