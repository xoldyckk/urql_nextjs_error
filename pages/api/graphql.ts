import { NextApiRequest, NextApiResponse } from "next";
import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "graphql-tag";
import { GraphQLError } from "graphql";

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  graphqlEndpoint: "/api/graphql",
  schema: makeExecutableSchema({
    resolvers: {
      Query: {
        user: (_parent, args) => {
          if (args.id !== "1") {
            throw new GraphQLError("No user found for provided argument id.", {
              extensions: {
                code: "NOT_FOUND",
                path: ["id"],
              },
            });
          } else {
            return {
              id: args.id,
            };
          }
        },
      },
    },
    typeDefs: gql`
      type User {
        id: String
      }

      type Query {
        user(id: ID!): User!
      }
    `,
  }),
});
