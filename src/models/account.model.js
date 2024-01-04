import { Schema, model } from "mongoose";

const accountCollection = "accounts";

const accountSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: { type: Number, required: true },
  password: { type: String, required: true },
});

const accountModel = model(accountCollection, accountSchema);

export default accountModel;
