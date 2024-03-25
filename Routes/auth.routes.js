import { Router } from "express";
import { deactivate, login, sendOTP, signup } from "../Controllers/auth.controllers.js";
import { verifyJWT, verifyOTP } from "../Middlewares/auth.middleware.js";

const router = Router();

// handle otp request
router.post("/get-otp", sendOTP);

// sign up first time
router.post("/signup", verifyOTP, signup);

// logins
router.post("/login", login);

// delete account
router.get("/deactivate", verifyJWT, deactivate);

export default router;
