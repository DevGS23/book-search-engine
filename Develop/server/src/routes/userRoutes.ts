import { Router, Request, Response } from 'express';
import User from '../models/User.js';  // Assuming User model is correctly set up

const router = Router();

// GET all users
router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await User.find();  // Fetch all users
    res.json(users);  // Return users
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user by _id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new user
router.post("/", async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);  // Create a new user
    res.status(201).json(newUser);  // Return the created user
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT to update a user by _id
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a user by _id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
