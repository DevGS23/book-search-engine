var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import User from '../models/User.js'; // Assuming User model is correctly set up
const router = Router();
// GET all users
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find(); // Fetch all users
        res.json(users); // Return users
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// GET a single user by _id
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.params.id).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// POST a new user
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield User.create(req.body); // Create a new user
        res.status(201).json(newUser); // Return the created user
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// PUT to update a user by _id
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// DELETE a user by _id
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
export default router;
