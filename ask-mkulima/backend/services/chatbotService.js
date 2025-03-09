
const dialogflow = require('@google-cloud/dialogflow');
const config = require('../config/config'); // Import your configuration

const chatbotService = {
  async detectIntent(text, sessionId, languageCode = 'en-US') {
    try {
      const sessionClient = new dialogflow.SessionsClient();
      const sessionPath = sessionClient.projectAgentSessionPath(
        config.dialogflowProjectId,
        sessionId
      );

      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: text,
            languageCode: languageCode,
          },
        },
      };

      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;

      if (result.intent) {
        return {
          intent: result.intent.displayName,
          fulfillmentText: result.fulfillmentText,
          parameters: result.parameters,
        };
      } else {
        return {
          fulfillmentText: result.fulfillmentText,
        };
      }
    } catch (error) {
      console.error('Error in chatbotService:', error);
      throw error;
    }
  },

  // Add other chatbot-related service methods as needed
};

module.exports = chatbotService;