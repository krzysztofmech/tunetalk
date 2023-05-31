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
      display_name
      email
      followers {
        total
      }
      href
      id
      images {
        url
      }
      product
      type
      uri
    }
  }
`);
