import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { resolvers } from "./utils/resolvers.ts";
import { typeDefs } from "./utils/typeDefs.ts";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import dotenv from "dotenv";
// import { weatherAPI } from "./utils/req.ts";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

const http_server = http.createServer(app);

const apollo_server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: http_server })],
    introspection: process.env.NODE_ENV === "development",
});

await apollo_server.start();

app.use(
    "/graphql",
    cors(),
    express.json({
        limit: "50mb",
    }),
    (req, res, next) => {
        res.setHeader("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
        next();
    },
    expressMiddleware(apollo_server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    })
);

app.get("/", (req, res) => {
    res.json({
        message: "head to /graphql",
    });
});

http_server.listen(PORT, () => {
    console.log(`🚀  Server ready at http://localhost:${PORT}`);
});
