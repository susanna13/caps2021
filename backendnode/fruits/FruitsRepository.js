import mongoose from "mongoose";
import FruitSchema, { FruitColorSchema } from "./FruitSchema.js";
import { composeWithMongoose } from "graphql-compose-mongoose";

export const FruitModel = mongoose.model("Fruit", FruitSchema);
export const FruitColorModel = mongoose.model("FruitColor", FruitColorSchema);
export const FruitTC = composeWithMongoose(FruitModel);
export const FruitColorTC = composeWithMongoose(FruitColorModel);