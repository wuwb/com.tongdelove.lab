import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { fetchPoems } from '../../api/fetch-poems.api';
import { PoemGrid } from '../../components/PoemGrid';

const PoemGridWithReactQuery: FC = () => {
  const { data, isLoading, error } = useQuery(
    ['poems'],
    async () => fetchPoems(),
    {
      onError: (err) => {
        if (err instanceof Error) {
          return new Error(err.response.status, {
            message: err.message,
          });
        }
        return new Error(500);
      },
    }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    const { message, name } = error as Error;
    return (
      <div>
        Error {message} ({name})
      </div>
    );
  }
  return <>{data && <PoemGrid poems={data} />}</>;
};

export const PoetryBlock: FC = () => {
  return (
    <div>
      <div className="lg:container lg:mx-auto">
        <h1 className="mb-2 text-4xl font-bold">Poetry on the wild.</h1>
        <h2 className="mb-2 text-xl font-bold text-indigo-600">
          Client fetch with ofetch / react-query from nextjs api, db in
          supabase.io, connection with prisma. Ui with tailwind
        </h2>
        <PoemGridWithReactQuery />
      </div>
    </div>
  );
};
