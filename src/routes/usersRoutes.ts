import { Router } from "express";

import { getUserById, updateUser } from "../controllers/usersController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/:id", getUserById);
router.put("/:id", verifyToken, updateUser);

export default router;
