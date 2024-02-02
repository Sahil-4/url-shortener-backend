import { model, Schema, Types } from "mongoose";

const userSchema = new Schema({});

const User = model("users", userSchema);
export default User;
