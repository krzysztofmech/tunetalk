import { graphql } from "@/gql/gql";

export const user = graphql(`
  query User($id: Int!) {
    user(id: $id) {
      id
      name
      createdAt
      updatedAt
      image
      email
    }
  }
`);

export const me = graphql(`
  query Me {
    me {
      id
      name
      createdAt
      updatedAt
      image
      email
    }
  }
`);
