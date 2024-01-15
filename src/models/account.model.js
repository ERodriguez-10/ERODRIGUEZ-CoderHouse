import { Schema, model } from "mongoose";

const accountCollection = "accounts";

const accountSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  email: {
    type: String,
    unique: true,
  },
  avatar: { type: String },
  password: { type: String },
  registerWith: { type: String, required: true },
  role: { type: String, required: true },
  github_id: { type: String },
  google_id: { type: String },
});

const accountModel = model(accountCollection, accountSchema);

export default accountModel;
