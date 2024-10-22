// DON'T USE SECRETS IN FRONTEND IN PRODUCTION. THIS IS ONLY FOR TESTS PURPOSES
import env from 'react-dotenv';

import { IPromptMessage } from './prompt/types';

const chatGPTUrl = 'https://api.openai.com/v1/chat/completions';
const model = 'gpt-4-turbo';

export const fetchOpenAi = async (
  messages: IPromptMessage[],
): Promise<string> => {
  const openAiResponse = await fetch(chatGPTUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.OPEN_AI_API_KEY}`, // SHOULD BE MOVED TO A BACKEND
    },
    body: JSON.stringify({
      model,
      messages,
    }),
  });

  const data = await openAiResponse.json();
  return data.choices[0].message.content;
};
