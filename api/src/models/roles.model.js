import { Schema, model } from "mongoose";
const rolesSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model('Role',rolesSchema)