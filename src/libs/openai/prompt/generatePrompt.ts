import { IPromptMessage } from './types';

type GeneratePromptParams = {
  color: string;
  title: string;
  size: string;
};

const generateUserMessage = (params: GeneratePromptParams) => {
  const { color, title, size } = params;
  return `Create a HTML code of a button with color ${color}, title ${title}, and size ${size}. You must use exactly the following title: ${title}.`;
};

export const generatePrompt = (
  params: GeneratePromptParams,
): IPromptMessage[] => {
  return [
    {
      role: 'system',
      content:
        'You are an experienced UI developer who generates clean and efficient component code. The components should be well-structured, easy to maintain, and follow modern development standards. Respond concisely, including only the necessary parts of the code without excessive comments.',
    },
    {
      role: 'user',
      content: generateUserMessage(params),
    },
  ];
};
