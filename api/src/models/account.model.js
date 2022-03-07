import { Schema, model } from "mongoose";
const accountSchema = new Schema({
  accountName: {
    type: String,
    required: [true, "Name of account is required"],
  },
  currentAmount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  transactions: [{
    type: { type: String, required: [true, "Type of transaction is required"] },
    value: {type:Number, required: [true, "Value of transaction is required"]},
    date: {type:Date, required:[true, "Date of transaction is required"]},
    category:{type:String, required:[true, "Origin of transaction is required"]},
    origin: String,
    destination : String,
    description: String
  }],
},
{
  timestamps: true,
  versionKey: false
});
export default model('Account',accountSchema)
