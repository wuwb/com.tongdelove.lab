import type { SearchPoems } from '@/backend/features/poem/SearchPoems';

export const fetchPoems = async (): Promise<SearchPoems> => {
  return fetch('/api/rest/poem').then(
    (resp) => {
      if (!resp) {
        throw new Error(
          // @todo improve error reporting
          `Error fetching poems: ${JSON.stringify(resp?.errors ?? '')}`
        );
      }
      return resp.data;
    }
  );
};
