import express, { Request, Response } from 'express'; // Import types for Request and Response
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/socialNetworkDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use("/api/users", userRoutes);

app.get("/", (_req: Request, res: Response) => {
    res.send("Social Network API is running!");
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
