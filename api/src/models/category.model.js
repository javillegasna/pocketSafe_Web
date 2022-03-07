import { Schema, model } from "mongoose";
const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Name of the category is required"],
    },
    iconName: { type: String, required: [true, "Icon is required"] },
  },
  {
    timestamps: true,
    versionKey: false
  }
);
export default model("Category", categorySchema);
