import { RESTDataSource } from "@apollo/datasource-rest";
import { IncomingHttpHeaders } from "http";

export default class SpotifyApi extends RESTDataSource {
  public async me(headers: IncomingHttpHeaders) {
    return this.get("https://api.spotify.com/v1/me", {
      headers: {
        authorization: headers.authorization as string,
      },
    });
  }
}
