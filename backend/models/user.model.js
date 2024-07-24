import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role:String,
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
