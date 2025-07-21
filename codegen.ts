import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.WPGRAPHQL_URL || "https://sukeltajat.fi/graphql",
  documents: "src/lib/queries/**/*.{ts,tsx,graphql}",
  generates: {
    "src/lib/queries/generated.ts": {
      preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
