import React from 'react';

import { LabeledInput } from '../components/LabeledInput';
import { FormLayout } from '../components/FormLayout';

import { useToast } from '../hooks';
import { fetchOpenAi } from '../libs/openai/index';
import { useFetchMutation } from '../hooks/useFetchMutation';
import { generateButtonPrompt } from '../libs/openai/prompt';
import { MarkdownCode } from '../components/MarkdownCode';

const extractErrorMessage = (error: unknown) => {
  if (
    error != null &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return 'An error occurred';
};

export const ButtonGenerator = () => {
  const { showToast } = useToast();

  const [
    fetchOpenAiMutation,
    { data: aiComponent, isFetching: isFetchingPrompt },
  ] = useFetchMutation({ queryFn: fetchOpenAi });

  const [color, setColor] = React.useState('');
  const [size, setSize] = React.useState('');
  const [title, setTitle] = React.useState('');

  document.title = 'Buttons Generator';

  const handleClickSendPrompt = async () => {
    try {
      await fetchOpenAiMutation(generateButtonPrompt({ color, size, title }));
    } catch (error) {
      showToast({ type: 'error', message: extractErrorMessage(error) });
    }
  };

  const isButtonDisabled =
    (!color.trim() && !size.trim() && !title.trim()) || isFetchingPrompt;

  return (
    <section className="grid container mx-auto">
      <section className="grid gap-10 my-10 mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-center">
          Customize your button styles
        </h1>
        <FormLayout>
          <LabeledInput
            label="Color"
            value={color}
            onChange={setColor}
            placeholder="Enter preferred color"
            maxLength={50}
          />

          <LabeledInput
            label="Size"
            value={size}
            onChange={setSize}
            placeholder="Enter preferred size"
            maxLength={50}
          />

          <LabeledInput
            label="Title"
            value={title}
            onChange={setTitle}
            placeholder="Enter button title"
            maxLength={50}
          />
        </FormLayout>

        <button
          disabled={isButtonDisabled}
          onClick={handleClickSendPrompt}
          title="Enter the prompt"
          className={
            isButtonDisabled
              ? 'bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          }
        >
          {isFetchingPrompt ? 'Loading...' : 'Generate code'}
        </button>
      </section>

      {!!aiComponent && <MarkdownCode code={aiComponent} />}
    </section>
  );
};
