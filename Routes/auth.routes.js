import { Router } from "express";
import { deactivate, login, signup } from "../Controllers/auth.controllers.js";

const router = Router();

// sign up first time
router.post("/signup", signup);

// logins
router.post("/login", login);

// delete account
router.post("/deactivate", deactivate);

export default router;
