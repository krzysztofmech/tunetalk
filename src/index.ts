import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import SpotifyApi from "./data-sources/spotify";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers";
import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { config } from "dotenv";
config();

export interface MyContext {
  dataSources: {
    spotifyApi: SpotifyApi;
  };
  res: Response;
  req: Request;
}

const main = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  const typeDefs = readFileSync("./src/schema.graphql", { encoding: "utf-8" });
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({ origin: ["http://localhost:3000"] }),
    json(),
    expressMiddleware(server, {
      context: async ({ res, req }) => {
        return {
          dataSources: {
            spotifyApi: new SpotifyApi(),
          },
          res,
          req,
        };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

main();
