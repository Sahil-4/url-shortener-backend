import jwt from "jsonwebtoken";
import OTP from "../Models/otp.model.js";

export const verifyJWT = (req, res, next) => {
  try {
    const token = req.headers.authtoken.split(" ")[1];

    if (!token) return res.statuss(401).json({ success: false, message: "unauthorized request" });

    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN);
    req.userId = decodedToken._id;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "unauthorized request" });
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { username, email, otp } = req.body;
    const result = await OTP.findOne({ username, email, otp });

    if (!result) return res.status(401).json({ success: false, message: "invalid otp" });

    await OTP.findByIdAndDelete(result._id);

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "unable to verify otp" });
  }
};
