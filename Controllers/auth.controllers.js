import BlacklistedEmail from "../Models/blacklisted-email.model.js";
import OTP from "../Models/otp.model.js";
import User from "../Models/user.model.js";
import { sendOTPVerificationMail } from "../Services/mail.service.js";

export const blacklistEmail = async (req, res) => {
  try {
    const { email, key } = req.query;

    if (!email || !key || String(key) !== String(process.env.BLACKLISTING_KEY))
      return res
        .status(400)
        .json({ success: false, message: "invalid request" });

    const item = await BlacklistedEmail.create({ email });
    if (!item) return res.status(500).json({ success: false, message: "unable to black list email" });

    return res
      .status(200)
      .json({ success: true, message: "black listed email" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "unable to black list email" });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username?.trim()) return res.status(400).send("username is required");
    if (!email?.trim()) return res.status(400).send("email is required");

    const user = await User.findOne({ email });
    if (user) return res.status(409).json({ success: false, message: "already exists a user with this email" });

    const otp = await OTP.create({
      username,
      email,
      otp: "000000",
    });

    sendOTPVerificationMail(otp.email, otp.otp);

    return res
      .status(200)
      .json({ success: true, message: "otp send successfully", data: null });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "unable to send otp" });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username?.trim()) return res.status(400).send("username is required");
    if (!email?.trim()) return res.status(400).send("email is required");
    if (!password?.trim()) return res.status(400).send("password is required");

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(409)
        .json({ success: false, message: "already exists a user with this email" });

    const user = await User.create({
      username,
      email,
      password,
    });

    const token = await user.generateAccessToken();

    const data = {
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    };

    return res
      .status(200)
      .json({ success: true, message: "user created successfully", data });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "unable to create user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) return res.status(400).send("email and password are required");

    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res
        .status(404)
        .json({ success: false, message: "user does not exists" });

    if (!(await existingUser.comparePassword(password)))
      return res
        .status(401)
        .json({ success: false, message: "unauthorised request" });

    const token = await existingUser.generateAccessToken();

    const data = {
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      token,
    };

    return res
      .status(200)
      .json({ success: true, message: "login successful", data });
  } catch (error) {
    return res.status(500).json({ success: false, message: "unable to login" });
  }
};

export const deactivate = async (req, res) => {
  try {
    const userId = req.userId;

    const { acknowledged, deletedCount } = await User.deleteOne({
      _id: userId,
    });

    if (!acknowledged)
      return res
        .status(500)
        .json({ success: false, message: "unable to delete account" });

    if (acknowledged && deletedCount == 0)
      return res
        .status(404)
        .json({ success: false, message: "no account found" });

    return res
      .status(200)
      .json({ success: true, message: "account deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "unable to delete account" });
  }
};
