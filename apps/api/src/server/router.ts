import { Router } from "express";
import { authSignInController } from "~/server/controllers/auth/sign-in";
import { authSignUpController } from "./controllers/auth/sign-up";

const router: Router = Router();

// Authentication routes
router.post("/auth/sign-in", authSignInController);
router.post("/auth/sign-up", authSignUpController);

export { router };
