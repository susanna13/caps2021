import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const FruitColorSchema = new Schema({
  color: { type: String, enum: ["red", "green", "orange"] },
  fruits: [{ type: Schema.Types.ObjectId, ref: "Fruit" }],
});

export default new Schema({
  type: { type: String, enum: ["apple", "pear", "orange"] },
  name: { type: String },
  comment: { type: String },
  color: { type: Schema.Types.ObjectId, ref: "FruitColor" },
});