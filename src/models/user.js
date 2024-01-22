import { Schema, model } from "mongoose";

const userCollection = "users";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  email: {
    type: String,
  },
  avatar: { type: String },
  password: { type: String },
  cart: { type: Array },
  registerWith: { type: String, required: true },
  role: { type: String, required: true },
  github_id: {
    type: String,
  },
  google_id: {
    type: String,
  },
});

userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $exists: true, $type: "string" } },
  }
);

userSchema.index(
  { github_id: 1 },
  {
    unique: true,
    partialFilterExpression: { github_id: { $exists: true, $type: "string" } },
  }
);

userSchema.index(
  { google_id: 1 },
  {
    unique: true,
    partialFilterExpression: { google_id: { $exists: true, $type: "string" } },
  }
);

const userModel = model(userCollection, userSchema);

export default userModel;
