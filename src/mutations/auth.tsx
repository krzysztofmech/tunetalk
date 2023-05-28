import { graphql } from "@/gql";

export const authenticate = graphql(
  `
    mutation Authenticate {
      authenticate
    }
  `
);

export const login = graphql(
  `
    mutation Login($code: String, $state: String) {
      login(code: $code, state: $state) {
        code
        state
      }
    }
  `
);
