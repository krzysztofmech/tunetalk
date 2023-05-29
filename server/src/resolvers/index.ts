import { Resolvers } from "../generated/resolvers-types";
import { queries } from "./queries";
import { mutations } from "./mutations";

export const resolvers: Resolvers = {
  Query: { ...queries },
  Mutation: { ...mutations },
};
