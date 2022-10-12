export const config = {
  defaultOptions: {
    queries: {
      // staleTime: 1 * 60 * 60 * 1000,
      staleTime: Infinity,
      // cacheTime: 5 * 60 * 60 * 1000,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: false,
    },
  },
};
