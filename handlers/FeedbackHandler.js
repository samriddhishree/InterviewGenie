const Alexa = require("ask-sdk-core");



const FeedbackHandler = {
  canHandle(handlerInput) {
    
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" && Alexa.getIntentName(handlerInput.requestEnvelope) === "FeedbackIntent";
  
  },
  handle(handlerInput) {
    console.info("[FeedbackHandler] Received.")
    
    let setter = handlerInput.attributesManager
    let am = setter.getSessionAttributes()


    let isGood;
    let question;
    let sample;
    if (am.prevIsGood) {
      isGood = am.prevIsGood
    }
    if (am.prevQuestion) {
      question = am.prevQuestion
    }
    console.log('am and am prev sample ================:>>>>><<<<<:===============',am, am.prevSampleAnswer)
    if (am.prevSampleAnswer) {
      sample = am.prevSampleAnswer
      console.log('in prev sample', sample, am.prevSampleAnswer)
    }

    if (!isGood) {
      return handlerInput.responseBuilder
        .speak("There's nothing to give feedback on!")
        .withShouldEndSession(false)
        .getResponse()
    }
    const speechText = `Is Your Answer Good: ${isGood}... A good answer would be: ${sample}`;
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Feedback", speechText)
      .withShouldEndSession(false)
      .getResponse();


  }
};

module.exports = FeedbackHandler;