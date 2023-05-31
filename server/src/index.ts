import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import SpotifyApi from "./data-sources/spotify";
import { promises } from "fs";
import { resolvers } from "./resolvers";
import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { config } from "dotenv";
import path from "path";
config({ path: `.env.${process.env.NODE_ENV}` });

export interface MyContext {
  dataSources: {
    spotifyApi: SpotifyApi;
  };
  res: Response;
  req: Request;
  token: string;
}

const main = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  const schemaDir = `./src/schema/`;
  const schema = await promises.readdir(schemaDir);

  const typeDefs = await Promise.all(
    schema.map((file: any) => {
      const fullPath = path.join(schemaDir, file);
      return promises.readFile(fullPath, { encoding: "utf-8" });
    })
  );

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000"],
      credentials: true,
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ res, req }) => {
        const token = req.headers.authorization || "";

        return {
          dataSources: {
            spotifyApi: new SpotifyApi(),
          },
          res,
          req,
          token,
        };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );
};

main();
