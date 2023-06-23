import { Router } from "express";

import {
  createTransaction,
  getUserTransactions,
} from "../controllers/transactionsController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", verifyToken, getUserTransactions);
router.post("/", verifyToken, createTransaction);

export default router;
