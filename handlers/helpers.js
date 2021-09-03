exports.sampleAnswer = async (question) => {
  const OpenAI = require('openai-api');

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const openai = new OpenAI(OPENAI_API_KEY);

  const gptResponse = await openai.complete({
        engine: 'davinci-instruct-beta',
        prompt: `What is the best answer to the interview question "${question}":\n`,
        maxTokens: 64,
        temperature: .1,
        topP: 1,
        bestOf: 5,
        n: 1,
        stream: false,
        stop: ['\n\n']
    }).catch(error => {console.log("caught err",error)});
    console.log('gpt sample',gptResponse.data.choices[0].text)

    return gptResponse.data.choices[0].text;

}

exports.generateQuestion = async (topic = null) => {
  const OpenAI = require('openai-api');

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const openai = new OpenAI(OPENAI_API_KEY);

        console.log("gpt this is topic", topic)
  if (typeof(topic) != 'string') {
    topic = null;
  }

  if (topic == "general") {
    topic = null;
  }

  let prompt = (topic ? `Ask me a difficult job interview question about ${topic}:\n` : "Ask me a behavioral job interview question:\n");
  const gptResponse = await openai.complete({
        engine: 'davinci-instruct-beta',
        prompt: prompt,
        maxTokens: 64,
        temperature: 1,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 5,
        n: 1,
        stream: false,
        stop: ['\n\n']
    }).catch(error => {console.log("caught err",error)});
    
    return gptResponse.data.choices[0].text;
 
}


exports.assessAnswer = async (question, answer) => {
    const OpenAI = require('openai-api');

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const openai = new OpenAI(OPENAI_API_KEY);
  
  console.log('q, a', question, answer)
  
  if (!question || !answer) {
    throw 'No question and answer';
  }

  let prompt = `Q:Is "${answer}" a good answer to the job interview question "${question}", and why?\nA:`;
  const gptResponse = await openai.complete({
        engine: 'davinci-instruct-beta',
        prompt: prompt,
        maxTokens: 64,
        temperature: .1,
        topP: 1,
        n: 1,
        stream: false,
        stop: ['\n\n']
    }).catch(error => {console.log("caught err",error)});

    console.log("gpt response assess", gptResponse.data.choices[0].text)
    
    return gptResponse.data.choices[0].text;

}