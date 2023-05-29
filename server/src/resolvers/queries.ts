import { QueryResolvers, User } from "../generated/resolvers-types";
import { prisma } from "../db";
export const queries: QueryResolvers = {
  me: async (_, __, context) => {
    const { headers } = context.req;
    return context.dataSources.spotifyApi.me(headers);
  },
  user: async (parent: User, args: User) => {
    const user = await prisma.user.findUnique({ where: { id: args.id! } });
    return user;
  },
};
