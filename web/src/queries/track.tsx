import { graphql } from "@/gql";

export const topTracks = graphql(`
  query TopTracks($limit: Int!, $offset: Int!, $time_range: TimeRange!) {
    topTracks(limit: $limit, offset: $offset, time_range: $time_range) {
      items {
        id
        name
        uri
        duration_ms
        album {
          id
          name
          images {
            url
            height
            width
          }
        }
        artists {
          id
          name
        }
      }
    }
  }
`);
