const Alexa = require("ask-sdk-core");

const StopHandler = {
  canHandle(handlerInput) {
    
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" && (Alexa.getIntentName(handlerInput.requestEnvelope) === "HelpIntent" || Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent");

  },
  handle(handlerInput) {
    console.info("[HelpHandler] Received.")
    
    const speechText = `InterviewGenie helps you prepare for a job interview by giving unique, topic-relevant questions. Say interview me on the topic name for a specific interview topic, or say general for general interview questions. \nWhen practicing, say SKIP to go past a question. \nSay STOP to end the practice interview. \nBegin your responses with the word ANSWER to get the next question, or FEEDBACK to get feedback on your response before moving onto the next question. This feature is in beta, but still gives strong responses.\nSay REPEAT to repeat the question.\nSay SAMPLE to get an example answer. \nSay NEXT to move on to the next question`;
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();


  }
};

module.exports = StopHandler;