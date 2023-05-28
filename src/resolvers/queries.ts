import { QueryResolvers, User } from "../generated/resolvers-types";
import { prisma } from "../db";
export const queries: QueryResolvers = {
  user: async (parent: User, args: User) => {
    const user = await prisma.user.findUnique({ where: { id: args.id! } });
    return user;
  },
};
