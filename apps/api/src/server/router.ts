import { Router } from "express";
import { authSignInController } from "~/server/controllers/auth/sign-in";

const router: Router = Router();

// Authentication routes
router.post("/auth/sign-in", authSignInController);

export { router };
