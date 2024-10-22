const sanitizeInput = (input: string) => {
  input = input.trim();
  input = input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  return input;
};

export const sanitizeParams = <
  Keys extends string,
  Params extends Record<Keys, string>,
>(
  params: Params,
): Record<Keys, string> => {
  const keys = Object.keys(params) as Keys[];

  return keys.reduce(
    (acc, key) => {
      acc[key] = sanitizeInput(params[key]);
      return acc;
    },
    {} as Record<Keys, string>,
  );
};
