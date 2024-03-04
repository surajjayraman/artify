import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  profileImagePath: {
    type: String,
    required: [true, "Profile Image is required"],
  },
  wishList: {
    type: Array,
    default: [],
  },
  cart: {
    type: Array,
    default: [],
  },
  order: {
    type: Array,
    default: [],
  },
  work: {
    type: Array,
    default: [],
  },
});

const User = models.User || model("User", UserSchema);

export default User;
