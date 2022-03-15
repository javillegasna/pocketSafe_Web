import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Name must be unique"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    roles: [{ ref: "Role", type: Schema.Types.ObjectId }],
    categories: [{ ref: "Category", type: Schema.Types.ObjectId }],
    accounts: [{ ref: "Account", type: Schema.Types.ObjectId }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};
export default model("User", userSchema);
