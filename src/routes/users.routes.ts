import { Router } from "express";

import { createUser, login } from "../controllers/users.controller";

const router = Router();

router.post("/", createUser);

export default router;
