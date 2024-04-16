import { Schema, model } from "mongoose";

const blacklistedEmailSchema = new Schema(
  {
    email: String,
  },
  {
    timestamps: true,
  }
);

const BlacklistedEmail = new model("blacklistedEmail", blacklistedEmailSchema);
export default BlacklistedEmail;
