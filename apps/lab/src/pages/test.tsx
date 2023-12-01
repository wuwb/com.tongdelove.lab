import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
// import superjson from "superjson";
import { trpc } from '@/utils/trpc'

// const trpc = createTRPCProxyClient<any>({
//   // transformer: superjson,
//   links: [
//     httpBatchLink({
//       url: 'http://localhost:3000/api/trpc',
//     }),
//   ],
// });

export default function IndexPage() {

  console.log('trpc: ', trpc);
  console.log('trpc.hello: ', trpc.hello);
  const hello = trpc.hello.useQuery({ text: 'client' })
  console.log('hello: ', hello);


  if (!hello?.data) {
    return <div>Loading...</div>;
  }

  console.log('hello', hello.data)
  return (
    <div>
      123
      <p>{hello?.data?.greeting}</p>
    </div>
  );
}
