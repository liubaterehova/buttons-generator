export type PromptMessageRole = 'system' | 'user' | 'assistant';

export interface IPromptMessage {
  role: PromptMessageRole;
  content: string;
}
