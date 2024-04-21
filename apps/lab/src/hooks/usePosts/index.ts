import { useQuery } from '@tanstack/react-query'
import axios from '@/utils/axios'

const endpoint = 'https://graphqlzero.almansi.me/api'

const fetchPosts = async (limit = 10) => {
  const data = await axios.get('/api/posts')
  const result = data.data.filter(x => x.id <= limit)
  return result
}

const fetchGQLPosts = async () => {
  // const {
  //   posts: { data },
  // } = await request(
  //   endpoint,
  //   gql`
  //     query {
  //       posts {
  //         data {
  //           id
  //           title
  //         }
  //       }
  //     }
  //   `
  // );
  // return data;
}

const usePosts = limit => {
  return useQuery(['posts', limit], () => fetchPosts(limit))
}

function useGQLPosts() {
  return useQuery(['posts'], async () => fetchGQLPosts())
}

export { usePosts, fetchPosts }
