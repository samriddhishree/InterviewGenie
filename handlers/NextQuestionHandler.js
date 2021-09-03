const Alexa = require("ask-sdk-core");

const { generateQuestion, assessAnswer, sampleAnswer } = require('./helpers')

const NextQuestionHandler = {
  canHandle(handlerInput) {
    
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" && Alexa.getIntentName(handlerInput.requestEnvelope) === "NextQuestionIntent";

  },
  async handle(handlerInput) {
    
    console.info("[NextQuestionHandler] Received.")
    
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
    
    if (am.question && slots['answer'].value) {
      isGood = await assessAnswer(am.question, slots['answer'].value)
    }

    console.log('topic', topic)

    let question = await generateQuestion(topic);

    let prevSampleAnswer = await sampleAnswer(am.question);
console.log("prev sample", prevSampleAnswer)
    let speechText = `The next question is: ${question}`;


  handlerInput.attributesManager.setSessionAttributes({question: question, topic: topic, prevQuestion: am.question, prevIsGood: isGood, prevSampleAnswer: prevSampleAnswer})

    

    return handlerInput.responseBuilder
    .speak(speechText)
    .reprompt("If you're stuck, say sample to get some examples. Start your response with the word ANSWER or FEEDBACK, so it can be recognized by InterviewMe. ")
    .withShouldEndSession(false)
    .getResponse();
    
  }
};

module.exports = NextQuestionHandler;