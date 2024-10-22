import React from 'react';

import { LabeledInput } from '../components/LabeledInput';
import { FormLayout } from '../components/FormLayout';

import { useToast } from '../hooks';
import { fetchOpenAi } from '../libs/openai/index';
import { useFetchMutation } from '../hooks/useFetchMutation';

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
  const [text, setText] = React.useState('');

  document.title = 'Buttons Generator';

  const handleClickSendPrompt = async () => {
    try {
      await fetchOpenAiMutation(prompt);
    } catch (error) {
      showToast({ type: 'error', message: extractErrorMessage(error) });
    }
  };

  const isButtonDisabled = !prompt.trim() || isFetchingPrompt;

  return (
    <section className="grid mx-auto max-w-2xl mb-10">
      <h1 className="my-10 text-2xl font-bold text-center">
        Customize your button styles
      </h1>

      <FormLayout>
        <LabeledInput
          label="Color"
          value={color}
          onChange={setColor}
          placeholder="Enter preferred color"
        />

        <LabeledInput
          label="Size"
          value={size}
          onChange={setSize}
          placeholder="Enter preferred size"
        />

        <LabeledInput
          label="Title"
          value={text}
          onChange={setText}
          placeholder="Enter button title"
        />
      </FormLayout>

      <button
        disabled={isButtonDisabled}
        onClick={handleClickSendPrompt}
        title={'Enter the prompt'}
        className={
          isButtonDisabled
            ? 'mt-10 mb-10 bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
            : 'mt-10 mb-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        }
      >
        {isFetchingPrompt ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" />
            Loading...
          </>
        ) : (
          'Generate code'
        )}
      </button>

      {aiComponent}
    </section>
  );
};
