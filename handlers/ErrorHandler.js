const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.error(`[ErrorHandler] Error handled.`, error.message);

    const sayAgainSpeechText = "Sorry, I don't understand that. Start a response with the word ANSWER. Say HELP for all commands.";

    return handlerInput.responseBuilder
      .speak(sayAgainSpeechText)
      .reprompt(sayAgainSpeechText)
      .getResponse();
  }
};

module.exports = ErrorHandler;