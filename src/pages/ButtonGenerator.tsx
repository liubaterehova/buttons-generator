import React from 'react';

import { LabeledInput } from '../components/LabeledInput';
import { FormLayout } from '../components/FormLayout';

import { useToast } from '../hooks';
import { fetchOpenAi } from '../libs/openai/index';
import { useFetchMutation } from '../hooks/useFetchMutation';
import { generateButtonPrompt } from '../libs/openai/prompt';
import { MarkdownCode } from '../components/MarkdownCode';
import { Toggle } from '../components/Toggle/Toggle';

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

  const [isStyleShown, setIsStyleShown] = React.useState(false);
  const [color, setColor] = React.useState('');
  const [size, setSize] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [style, setStyle] = React.useState('');

  document.title = 'Buttons Generator';

  const handleClickSendPrompt = async () => {
    try {
      const prompt = isStyleShown
        ? generateButtonPrompt({ style })
        : generateButtonPrompt({ color, size, title });

      await fetchOpenAiMutation(prompt);
    } catch (error) {
      showToast({ type: 'error', message: extractErrorMessage(error) });
    }
  };

  const isButtonDisabled =
    isFetchingPrompt || isStyleShown
      ? !style.trim()
      : !color.trim() && !size.trim() && !title.trim();

  return (
    <section className="grid container mx-auto">
      <section className="grid gap-10 my-10 mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-center">
          Customize your button styles
        </h1>

        <Toggle
          checked={isStyleShown}
          onChange={setIsStyleShown}
          label="Show style input"
        />

        <FormLayout>
          {isStyleShown ? (
            <LabeledInput
              label="Style"
              value={style}
              onChange={setStyle}
              placeholder="Enter button style"
              maxLength={300}
            />
          ) : (
            <>
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
            </>
          )}
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
          {isFetchingPrompt ? 'Loading...' : 'Generate Button'}
        </button>
      </section>

      {!!aiComponent && <MarkdownCode code={aiComponent} />}
    </section>
  );
};
