import { model, Schema, Types } from "mongoose";
import { getShortURL } from "../Utils";

// URL schema
const urlSchema = new Schema(
  {
    short_url: {
      type: String,
      required: [true, "short_url is a required feild"],
      index: true,
      unique: true,
    },
    original_url: {
      type: String,
      required: [true, "original_url is a required feild"],
    },
    user_id: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "user_id is a required feild"],
    },
    visits: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// update short url feild before saving url
urlSchema.pre("save", function (next) {
  if (!this.isModified("short_url")) next();

  this.short_url = getShortURL();
  next();
});

// update url hit count
urlSchema.methods.increamentHits = async function () {
  this.visits = this.visits + 1;
  await this.save();
};

// creating and exporting URL model
const URL = model("URL", urlSchema);
export default URL;
