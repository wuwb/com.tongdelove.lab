export const isBrowser = () => {
  const isServer = typeof window === 'undefined';
  return !isServer;
};
