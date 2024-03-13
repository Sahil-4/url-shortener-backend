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
      required: [true, "email is a required feild"],
    },
    password: {
      type: String,
      required: [true, "password is a required feild"],
    },
  },
  { timestamps: true }
);

// hash password before saving user object in database
userSchema.pre("save", async function (next) {
  // if password feild is not modified
  if (!this.isModified("password")) return next();

  // if password is changed then hash it
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// check whether password is correct or not
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// creating and exporting User model
const User = model("User", userSchema);
export default User;
