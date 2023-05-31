import {
  QueryResolvers,
  Track,
  QueryTopTracksArgs,
} from "../../generated/resolvers-types";

export const trackQueries: QueryResolvers = {
  topTracks: async (parent: Track, args: QueryTopTracksArgs, context) => {
    const { headers } = context.req;
    return context.dataSources.spotifyApi.topTracks(
      args.limit,
      args.offset,
      args.time_range,
      headers
    );
  },
};
