import { Schema, model } from "mongoose";
import { generateOTP } from "../Utils/index.js";

const otpSchema = new Schema(
  {
    username: {
      type: String,
      index: true,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    otp: {
      type: String,
      required: [true, "otp is required"],
    },
  },
  {
    timestamps: true,
  }
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

otpSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) return next();

  this.otp = generateOTP();
  next();
});

const OTP = new model("Otp", otpSchema);
export default OTP;
