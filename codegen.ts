import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "schema.graphql",
  generates: {
    "src/generated/types.ts": {
      documents: ["src/**/*.{gql,graphql}"],
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
    "src/generated/schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
