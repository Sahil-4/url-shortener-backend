import { Router } from "express";
import { deactivate, login, signup } from "../Controllers/auth.controllers.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";

const router = Router();

// sign up first time
router.post("/signup", signup);

// logins
router.post("/login", login);

// delete account
router.post("/deactivate", verifyJWT, deactivate);

export default router;
