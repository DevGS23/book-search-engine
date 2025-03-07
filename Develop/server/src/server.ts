import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import db from './config/connection.js';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Create Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Enables GraphQL Playground
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://admin:admin23@cluster0.zbd3q.mongodb.net/bookSearchDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Apply Apollo GraphQL Middleware
const startApolloServer = async () => {
    await server.start();
    app.use('/graphql', expressMiddleware(server));

    // API Routes
    app.use("/api/users", userRoutes);

    app.get("/", (_req, res) => {
        res.send("Social Network API is running!");
    });

    // Start the Express server
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
};

// Start Apollo Server
startApolloServer().catch(err => console.error(err));