import { Schema, model } from "mongoose";

const accountCollection = "accounts";

const accountSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  email: {
    type: String,
  },
  avatar: { type: String },
  password: { type: String },
  registerWith: { type: String, required: true },
  role: { type: String, required: true },
  github_id: {
    type: String,
  },
  google_id: {
    type: String,
  },
});

accountSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $exists: true, $type: "string" } },
  }
);

accountSchema.index(
  { github_id: 1 },
  {
    unique: true,
    partialFilterExpression: { github_id: { $exists: true, $type: "string" } },
  }
);

accountSchema.index(
  { google_id: 1 },
  {
    unique: true,
    partialFilterExpression: { google_id: { $exists: true, $type: "string" } },
  }
);

const accountModel = model(accountCollection, accountSchema);

export default accountModel;
