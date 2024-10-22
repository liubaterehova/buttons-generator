import { useCallback, useMemo, useRef, useState } from 'react';

type MutationFunction<ArgsT, ResT> = (
  args: ArgsT,
) => Promise<{ data: ResT } | { error: unknown }>;

interface IMutationState<ResT> {
  data?: ResT;
  isFetching: boolean;
  isError: boolean;
}

export const useFetchMutation = <ArgsT, ResT>({
  queryFn,
}: {
  queryFn: (args: ArgsT) => Promise<ResT>;
}): [MutationFunction<ArgsT, ResT>, IMutationState<ResT>] => {
  const [data, setData] = useState<ResT>();
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  const queryFnRef = useRef(queryFn);
  queryFnRef.current = queryFn;

  const mutate = useCallback(
    async (args: ArgsT) => {
      setData(undefined);
      setIsFetching(true);
      setIsError(false);
      try {
        const response = await queryFnRef.current(args);
        setData(response);
        return { data: response };
      } catch (error) {
        setIsError(true);
        return { error };
      } finally {
        setIsFetching(false);
      }
    },
    [setData, setIsFetching, setIsError, queryFnRef],
  );

  return useMemo(
    () => [mutate, { data, isFetching, isError }],
    [mutate, data, isFetching, isError],
  );
};
