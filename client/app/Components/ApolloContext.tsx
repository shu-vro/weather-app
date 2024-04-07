"use client";

import React from "react";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

export default function ApolloContext({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
