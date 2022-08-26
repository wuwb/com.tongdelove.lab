import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { request, gql } from "graphql-request";

const endpoint = "https://graphqlzero.almansi.me/api";

const getPostById = async (postId) => {
    const { data } = await axios.get(
        `/api/posts/${postId}`
    );
    return data;
};

const getGQLPostById = async (postId) => {
    const { post } = await request(
        endpoint,
        gql`
  query {
    post(id: ${postId}) {
      id
      title
      body
    }
  }
  `
    );

    return post;
};

export default function usePost(postId) {
    return useQuery(["post", postId], () => getPostById(postId));
}

function useGQLPost(postId) {
    return useQuery(
        ["post", postId],
        async () => getGQLPostById(postId),
        {
            enabled: !!postId,
        }
    );
}
