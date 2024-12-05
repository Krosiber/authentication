import express, { Request, Response } from "express";
import { registerUser } from "../controllers/auth.controllers";

const router = express.Router();

// Middleware wrapper kullanarak
router.post("/register", (req: Request, res: Response) => {
  registerUser(req, res);
});

export default router;