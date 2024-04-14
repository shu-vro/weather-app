"use client";

import React from "react";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: `http://${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/graphql`,
    cache: new InMemoryCache(),
});

export default function ApolloContext({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
