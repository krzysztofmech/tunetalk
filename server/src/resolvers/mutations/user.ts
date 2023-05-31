import { MutationResolvers, User } from "../../generated/resolvers-types";
import { prisma } from "../../db";
export const userMutations: MutationResolvers = {
  createUser: async (parent, { email, image, name }, context) => {
    const user: User = await prisma.user.create({
      data: {
        email,
        image,
        name,
      },
    });
    return user;
  },
};
