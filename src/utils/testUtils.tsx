import { act } from 'react-dom/test-utils';

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const pause = async (ms?: number) => {
  await act(async () => {
    await sleep(ms || 100);
  });
};
