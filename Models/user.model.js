import { model, Schema } from "mongoose";

// users schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is a required feild"],
    },
    email: {
      type: String,
      required: [true, "email is a required feild"]
    },
    password: {
      type: String,
      required: [true, "password is a required feild"],
    },
  },
  { timestamps: true }
);

// creating and exporting User model
const User = model("User", userSchema);
export default User;
