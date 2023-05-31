import { QueryResolvers, User } from "../../generated/resolvers-types";
import { prisma } from "../../db";
import { MyContext } from "src";
export const userQueries: QueryResolvers = {
  me: async (_, __, context: MyContext) => {
    const { headers } = context.req;
    return context.dataSources.spotifyApi.me(headers);
  },
  user: async (parent: User, args: User, context: MyContext) => {
    const user = await prisma.user.findUnique({ where: { id: args.id! } });

    return user;
  },
};
