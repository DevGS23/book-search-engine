var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
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
const startApolloServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield server.start();
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
});
// Start Apollo Server
startApolloServer().catch(err => console.error(err));
