const { ExpressAdapter } = require('ask-sdk-express-adapter');
const Alexa = require("ask-sdk-core");
const express = require('express');
const path = require("path");

// Handlers.
const {
	LaunchRequestHandler,
	ErrorHandler,
  GiveQuizHandler,
  NextQuestionHandler,
  StopHandler,
  StartOverHandler,
  HelpHandler,
  SampleHandler,
  FeedbackNextHandler
} = require("./handlers");

const app = express();
const skillBuilder = Alexa.SkillBuilders.custom()
  .withSkillId(process.env.ALEXA_API_KEY)
	.addRequestHandlers(
		LaunchRequestHandler,
    GiveQuizHandler,
    NextQuestionHandler,
    StopHandler,
    StartOverHandler,
    HelpHandler,
    SampleHandler,
    FeedbackNextHandler
	)
	.addErrorHandlers(ErrorHandler);

const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, true, true);

// HTML
app.use(
	"/",
	express.static(
		path.resolve(`${__dirname}/public`)
	)
);

app.use(
	"/privacypolicy",
	express.static(
		path.resolve(`${__dirname}/public/privacy-policy.html`)
	)
);

app.use(
	"/termsofuse",
	express.static(
		path.resolve(`${__dirname}/public/termsofuse.html`)
	)
);




// Alexa endpoint
app.post("/", adapter.getRequestHandlers());

// Start skills handler.
app.listen(1337, () => {
	console.info("Alexa Skills deployed.");
});
