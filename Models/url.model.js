import { model, Schema, Types } from "mongoose";

const urlSchema = new Schema({});

const URL = model("urls", urlSchema);
export default URL;
