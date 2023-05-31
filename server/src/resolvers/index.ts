import { Resolvers } from "../generated/resolvers-types";
import { userQueries } from "./queries/user";
import { userMutations } from "./mutations/user";
import { trackQueries } from "./queries/track";

export const resolvers: Resolvers = {
  Query: { ...userQueries, ...trackQueries },
  Mutation: { ...userMutations },
};
