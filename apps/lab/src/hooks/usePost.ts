import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const endpoint = 'https://graphqlzero.almansi.me/api'

const getPostById = async postId => {
  const { data } = await axios.get(`/api/posts/${postId}`)
  return data
}

const getGQLPostById = async (postId: string) => {
  //     const { post } = await request(
  //         endpoint,
  //         gql`
  //   query {
  //     post(id: ${postId}) {
  //       id
  //       title
  //       body
  //     }
  //   }
  //   `
  //     );
  //     return post;
}

export function usePost(postId) {
  return useQuery(['post', postId], () => getPostById(postId))
}

function useGQLPost(postId) {
  return useQuery(
    ['post', postId],
    async () => {
      return getGQLPostById(postId)
    },
    {
      // enabled: !!postId,
    }
  )
}
