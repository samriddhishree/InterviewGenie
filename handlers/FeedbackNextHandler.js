const Alexa = require("ask-sdk-core");

const { generateQuestion, assessAnswer, sampleAnswer } = require('./helpers')

const FeedbackNextHandler = {
  canHandle(handlerInput) {
    console.log('in feedback next',Alexa.getRequestType(handlerInput.requestEnvelope), Alexa.getIntentName(handlerInput.requestEnvelope))
    
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" && Alexa.getIntentName(handlerInput.requestEnvelope) === "FeedbackNextIntent";

  },
  async handle(handlerInput) {
    
    console.info("[FeedbackNextHandler] Received.")
    
    const slots = handlerInput.requestEnvelope.request.intent.slots;
        
    const am = handlerInput.attributesManager.getSessionAttributes()
    

    if (!am.question) {
      return handlerInput.responseBuilder
      .speak("Say interview me to start getting interview questions!")
      .withShouldEndSession(false)
      .getResponse();
    }

    

    let topic = null
    
    if (am.topic) {
      topic = am.topic
    }


    let isGood;
    let sample;
    
    console.log('topic', topic)

    let question = await generateQuestion(topic);

    if (slots['answer'].value) {
      isGood = await assessAnswer(am.question, slots['answer'].value)
      sample = await sampleAnswer(am.question)
    } else {
      return handlerInput.responseBuilder
        .speak("Please say your answer!")
        .withShouldEndSession(false)
        .getResponse()
    }


    let prevSampleAnswer = await sampleAnswer(am.question);
console.log("prev sample", prevSampleAnswer)
    let speechText = `Is Your Answer Good: ${isGood}... A good answer would be: ${sample}.\nThe next question is: ${question}`;


  handlerInput.attributesManager.setSessionAttributes({question: question, topic: topic})

    

    return handlerInput.responseBuilder
    .speak(speechText)
    .reprompt("If you're stuck, say sample to get some examples. Start your response with the word ANSWER or FEEDBACK, so it can be recognized by InterviewMe. ")
    .withShouldEndSession(false)
    .getResponse();
    
  }
};

module.exports = FeedbackNextHandler;