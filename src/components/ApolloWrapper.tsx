"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/wpClient";

export default function ApolloWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
