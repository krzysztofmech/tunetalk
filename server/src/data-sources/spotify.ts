import { RESTDataSource } from "@apollo/datasource-rest";
import { IncomingHttpHeaders } from "http";
import { TimeRange } from "../generated/resolvers-types";

export default class SpotifyApi extends RESTDataSource {
  public async me(headers: IncomingHttpHeaders) {
    return this.get("https://api.spotify.com/v1/me", {
      headers: {
        authorization: headers.authorization as string,
      },
    });
  }

  public async topTracks(
    limit: number,
    offset: number,
    time_range: TimeRange,
    headers: IncomingHttpHeaders
  ) {
    return this.get(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=${limit}&offset=${offset}`,
      {
        headers: {
          authorization: headers.authorization as string,
        },
      }
    );
  }
}
