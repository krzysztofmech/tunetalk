import { ApolloServer, BaseContext } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import SpotifyApi from "./data-sources/spotify";
import { promises } from "fs";
import { resolvers } from "./resolvers";
import { Request, Response } from "express";
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
  const schemaDir = `./src/schema/`;
  const schema = await promises.readdir(schemaDir);

  const typeDefs = await Promise.all(
    schema.map((file: any) => {
      const fullPath = path.join(schemaDir, file);
      return promises.readFile(fullPath, { encoding: "utf-8" });
    })
  );

  const server = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000 },

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
  });

  console.log(`🚀 Server ready at ${url}`);
};

main();
